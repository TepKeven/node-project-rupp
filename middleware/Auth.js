const { Sequelize } = require("sequelize")
const Session = require("../models/admin/Session")

const checkAuthValid = async (req,res,next) => {

    const login_token = req.cookies.login_token
    var date = new Date();
    const expired_time = new Date(date.setHours(date.getHours() + 2)).toISOString().slice(0, 19).replace('T', ' ');
    const current_time = new Date().toISOString().slice(0, 19).replace('T', ' ')

    if(login_token){
        console.log(login_token)
        var user_session = await Session.findOne({
            where: {
                token: login_token
            }
        })

        if(user_session){

            const user_time = new Date(user_session.expire).toISOString().slice(0, 19).replace('T', ' ')

            if(user_time > current_time){

                var updated_session = {
                    expire: expired_time
                }

                user_session = Object.assign(user_session,updated_session);
                await user_session.save()
                next()
            }
            else{
                const affected_rows = await Session.destroy({
                    where: {
                        token: login_token
                    }
                })

                res.status(404).json({
                    success: false,
                    message: "Session Expire. Please Login again"
                })
            }
        }
        else{
            res.status(404).json({
                success: false,
                message: "Session Not Found"
            })
        }
    }
    else{
        res.status(404).json({
            success: false,
            message: "Login Token Not Found"
        })
    }
}

module.exports = {checkAuthValid}