const { Sequelize } = require("sequelize");
const Customer = require("../../models/admin/Customer");
const DashboardItem = require("../../models/admin/DashboardItem");
const Session = require("../../models/admin/Session");
const User = require("../../models/admin/User");
const UserRole = require("../../models/admin/UserRole");

const checkAuthValidCustomer = async (req,res,next) => {

    const customer_login_token = req.cookies.customer_login_token || ""
    var date = new Date();
    const expired_time = new Date(date.setHours(date.getHours() + 24)).toISOString().slice(0, 19).replace('T', ' ');
    const current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if(customer_login_token){
        
        // console.log(login_token)
        var customer_session = await Session.findOne({
            where: {
                token: customer_login_token
            }
        })

        if(customer_session){

            const customer_time = new Date(customer_session.expire).toISOString().slice(0, 19).replace('T', ' ')

            if(customer_time > current_time){

                var updated_session = {
                    expire: expired_time
                }

                customer_session = Object.assign(customer_session,updated_session);
                await customer_session.save()
                next();
                
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
            message: "Login Token Not Found. Sorry"
        })
    }
}

module.exports = {checkAuthValidCustomer}