const Session = require("../../models/admin/Session")
const crypto = require("crypto");
const User = require("../../models/admin/User");
const bcrypt = require("bcrypt");
const { Sequelize, Op } = require("sequelize");

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

    // Only one user can login at the same time
    const deleted_row = await Session.destroy({
        where: {
            email: customer_login_email
        }
    })

    // delete expired session 
    const expire_rows = await Session.destroy({
        where: {
            expire: {
                [Op.lt]: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
        }
    })

    const customer = await User.findOne({
        where: {
            email: customer_login_email
        }
    })

    if(customer){

        bcrypt.compare(customer_login_password, customer.password, function(err, result) {
            if (result) {
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

module.exports = {customerLogin}