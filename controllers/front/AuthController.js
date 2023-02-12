const Session = require("../../models/admin/Session")
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { Sequelize, Op } = require("sequelize");
const Customer = require("../../models/admin/Customer");
const Address = require("../../models/admin/Address")

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

const customerRegister = async (req,res,next) => {

   var request = req.body
   var file = req.file
   var saltString;
   var encrytedPassword;
   var addressList;

   encrytedPassword = await bcrypt.genSalt(10).then(salt => {
      saltString = salt
      return bcrypt.hash(request.customer_password, saltString)
   })

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
      status: 1
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

   address = await Address.create(address)

   res.status(200).json({
      message: "success",
      customer: customer,
      address: address
   })
    
}   

module.exports = {customerLogin, customerRegister}