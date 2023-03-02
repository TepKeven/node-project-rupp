const Session = require("../../models/admin/Session")
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { Sequelize, Op } = require("sequelize");
const Customer = require("../../models/admin/Customer");
const Address = require("../../models/admin/Address");
const Country = require("../../models/admin/Country");
const OTP = require("../../models/admin/OTP");
const { transporter, getMailOptionsSend } = require("../../nodemailer");

const customerLogin = async (req,res,next) => {

    const {customer_login_email, customer_login_password} = req.body
    var customer_id = null;
    var date = new Date();
    const expired_time = new Date(date.setHours(date.getHours() + 24)).toISOString().slice(0, 19).replace('T', ' ');
    
    const options = {
        httpOnly: true,
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
        )
    }

    // delete expired session 
    const expire_rows = await Session.destroy({
        where: {
            expire: {
                [Op.lt]: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
        }
    })

    const customer = await Customer.findOne({
        where: {
            email: customer_login_email
        }
    })

    if(customer){

        bcrypt.compare(customer_login_password, customer.password, async function(err, result) {

            if (result) {

                // Only one Customer can login at the same time
                const deleted_row = await Session.destroy({
                    where: {
                        email: customer_login_email
                    }
                })
                
                customer_id = customer.customer_id
                const customer_login_token = crypto.randomBytes(16).toString("hex");
                const session = Session.create({
                    email: customer_login_email,
                    data: JSON.stringify({
                        language: "en",
                        currency: "USD",
                        customer_id: customer_id
                    }),
                    is_customer: 1,
                    token: customer_login_token,
                    expire: expired_time
                })

                console.log(customer_login_token)
                res.status(200).cookie('customer_login_token',customer_login_token, options).json({
                    message: "Login Successfully",
                    language: "en",
                    currency: "USD",
                    customer_login_token: customer_login_token 
                })
            }
            else{
                res.status(404).json({
                    success: false,
                    message: "Your Email or Password is incorrect."
                })
            }
        });
    }
    else{
        res.status(404).json({
            success: false,
            message: "No Customer with this Email Exists"
        })
    }
}

const customerRegisterGET = async (req,res,next) => {

    const countries = await Country.findAll();

    res.status(200).json({
        countries: countries
    })
}

const customerRegisterPOST = async (req,res,next) => {

   var request = req.body
   var file = req.file
   var saltString;
   var encrytedPassword;
   var emailCheck;
   var date = new Date();
//    const expired_time = new Date(date.setHours(date.getHours() + 24)).toISOString().slice(0, 19).replace('T', ' ');
//    const options = {
//         httpOnly: true,
//         expires: new Date(
//             Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
//         )
//     }


   encrytedPassword = await bcrypt.genSalt(10).then(salt => {
      saltString = salt
      return bcrypt.hash(request.customer_password, saltString)
   })

   emailCheck = await Customer.findOne({
        where: {
            email: request.customer_email,
        }
   })

   if(emailCheck){

        res.status(404).json({
            status: false,
            message: "This Email already Exists",
            
        })

   }
   else{

        const customer = await Customer.create({
            customer_group_id: 1,
            first_name: request.customer_first_name,
            last_name: request.customer_last_name,
            email: request.customer_email,
            telephone: request.customer_telephone,
            image: file == undefined ? "" : file.filename, 
            password: encrytedPassword,
            salt: saltString,
            newsletter: request.customer_newsletter,
            address_id: 0,
            ip: req.ip, 
            status: 0
        })
    
        const address = {
            customer_id: customer.customer_id,
            first_name: request.customer_first_name,
            last_name: request.customer_last_name,
            company: request.customer_company,
            address: request.customer_address,
            city: request.customer_city,
            postcode: request.customer_postcode,
            country_id: request.customer_country_id
        }
    
        const address_item = await Address.create(address)
        generateOTPCode(customer)

        res.status(200).json({
            success: true,
            message: "Please Verify our OTP Code From Your Email",
            address_item: address_item
        })
   
   }
   
}   

const generateOTPCode = (customer = {}) => {
    
    var date = new Date();
    const expired_time = new Date(date.setMinutes(date.getMinutes() + 5)).toISOString().slice(0, 19).replace('T', ' ');
    const OTPCode = Math.floor(1000 + Math.random() * 9000).toString();
    const mailOptionsSend = getMailOptionsSend(customer.email, `${process.env.STORE_NAME} - OTP Confirmation`, OTPCode)

    transporter.sendMail(mailOptionsSend).then(async (response) => {
        
        console.log(response)
        const affected_row = await OTP.destroy({
            where: {
                email: customer.email
            }
        })
    
        const otp_item = await OTP.create({
            user_id: customer.customer_id,
            email: customer.email,
            otp_code: OTPCode,
            expire: expired_time
        }) 
    
    })  
}

const generateNewOTPCode = async (req,res,next) => {

    const { otp_email } =  req.body;
    var date = new Date();
    const expired_time = new Date(date.setMinutes(date.getMinutes() + 5)).toISOString().slice(0, 19).replace('T', ' ');
    const OTPCode = Math.floor(1000 + Math.random() * 9000).toString();

    const mailOptionsSend = getMailOptionsSend(otp_email, `${process.env.STORE_NAME} - OTP Confirmation`, OTPCode)

    transporter.sendMail(mailOptionsSend, async (error, info) => {
       
        if(error){

            console.log(error)
            res.status(404).json({
                success: false,
                message: "There was a problem generating your OTP Code.",
            })
        }
        else{
            
            console.log(info.response)

            const old_otp_item = await OTP.findOne({
                where: {
                    email: otp_email
                }
            })
        
            await old_otp_item.update({
                otp_code: OTPCode,
                expire: expired_time
            })
    
            await old_otp_item.save();
    
            res.status(200).json({
                success: true,
                message: "Your Newly Generated OTP Code has been Sent",
            })
        }       
    })  

}

const verifyOTPCode = async (req,res,next) => {

    const { otp_code } =  req.body;
    var date = new Date();
    const expired_time = new Date(date.setHours(date.getHours() + 24)).toISOString().slice(0, 19).replace('T', ' ');
    const options = {
        httpOnly: true,
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
        )
    }

    const OTPItem = await OTP.findOne({
        where: {
            otp_code: otp_code,
            expire: {
                [Op.gt]: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
        }
    })

    if(OTPItem){

        const customer_login_token = crypto.randomBytes(16).toString("hex");
        const session = Session.create({
            email: OTPItem.email,
            data: JSON.stringify({
                language: "en",
                currency: "USD",
                customer_id: OTPItem.user_id
            }),
            is_customer: 1,
            token: customer_login_token,
            expire: expired_time
        })

        // console.log(customer_login_token)
        res.status(200).cookie('customer_login_token',customer_login_token, options).json({
            message: "Register Sucessfully. Logging in...",
            language: "en",
            currency: "USD",
            customer_login_token: customer_login_token
        })
    }
    else{

        const OTPCode = await OTP.findOne({
            where: {
                otp_code: otp_code,
            }
        })

        if(OTPCode){

            res.status(404).json({
                status: false,
                message: "Your OTP Code has Expired",
                
            })
        }
        else{

            res.status(404).json({
                status: false,
                message: "Your OTP Code Does not Exist",
                
            })
        }
    }

}

module.exports = {customerLogin, customerRegisterGET, customerRegisterPOST, verifyOTPCode, generateNewOTPCode}