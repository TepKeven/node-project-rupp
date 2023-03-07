const Session = require("../../models/admin/Session")
const crypto = require("crypto");
const User = require("../../models/admin/User");
const bcrypt = require("bcrypt");
const { Sequelize, Op } = require("sequelize");

const userLogin = async (req,res,next) => {

    const {login_email, login_password} = req.body
    var user_id = null;
    var date = new Date();
    const expired_time = new Date(date.setHours(date.getHours() + 2)).toISOString().slice(0, 19).replace('T', ' ');
    
    const options = {
        httpOnly: true,
        expires: new Date(
            Date.now() + 24 * 60 * 60 * 1000 // 24 hours
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

    const user = await User.findOne({
        where: {
            email: login_email,
            status: 1
        }
    })

    if(user){

        bcrypt.compare(login_password, user.password, async function(err, result) {
            
            if (result) {

                // Only one user can login at the same time
                const deleted_row = await Session.destroy({
                    where: {
                        email: login_email
                    }
                })

                user_id = user.user_id
                const login_token = crypto.randomBytes(16).toString("hex");
                const session = Session.create({
                    email: login_email,
                    data: JSON.stringify({
                        language: "en",
                        currency: "USD",
                        user_id: user_id
                    }),
                    is_customer: 0,
                    token: login_token,
                    expire: expired_time
                })


                res.status(200).cookie('login_token',login_token, options).json({
                    language: "en",
                    currency: "USD",
                    login_token: login_token 
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
            message: "No User with this Email Exists"
        })
    }
}

const userLogout = async (req,res,next) => {

    if(req.cookies.login_token){
        
        const login_token = await Session.findOne({
            where: {
                token: req.cookies.login_token,
                is_customer: 0
            }
        })

        if(login_token){

            res.clearCookie("login_token");

            const affected_row = await Session.destroy({

                where: {
                    token: req.cookies.login_token,
                    is_customer: 0
                }
            })

            res.status(200).json({
                success: true,
                message: "Logout Successfully",
                affected_row: affected_row
            })
        }

        else{

            res.status(404).json({
                success: false,
                message: "Session Does not Exist"
            })
        }
    }

    else{

        res.status(404).json({
            success: true,
            message: "You are not logged in"
        })
    }

}

module.exports = {userLogin, userLogout}