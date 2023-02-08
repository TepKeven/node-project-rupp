const { Sequelize } = require("sequelize");
const DashboardItem = require("../../models/admin/DashboardItem");
const Session = require("../../models/admin/Session");
const User = require("../../models/admin/User");
const UserRole = require("../../models/admin/UserRole");

const checkAuthValidUser = async (req,res,next) => {

    const login_token = req.cookies.login_token || ""
    var date = new Date();
    const expired_time = new Date(date.setHours(date.getHours() + 2)).toISOString().slice(0, 19).replace('T', ' ');
    const current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const requested_url = req.headers.relative_url + "/" || "";

    if(login_token){
        
        // console.log(login_token)
        var user_session = await Session.findOne({
            where: {
                token: login_token
            }
        })

        if(user_session){

            const user_time = new Date(user_session.expire).toISOString().slice(0, 19).replace('T', ' ')

            if(user_time > current_time){

                var session_data = JSON.parse(user_session.data)

                var user_id = session_data.user_id;

                const user = await User.findByPk(user_id);

                if(user){
                    const user_role = await UserRole.findByPk(user.user_role_id)

                    if(user_role){
                        
                        const user_role_permission_id = JSON.parse(user_role.permission) || [];

                        const user_role_permission = await DashboardItem.findAll({
                            where: {
                                dashboard_item_id: user_role_permission_id
                            }
                        })

                        var user_permission_url = user_role_permission.map(user_permission => {
                            return user_permission.href
                        })

                        var permission = user_permission_url.find(user_permission => requested_url.startsWith(user_permission + "/"));

                        if(permission){

                            var updated_session = {
                                expire: expired_time
                            }
            
                            user_session = Object.assign(user_session,updated_session);
                            await user_session.save()
                            next();
                        }

                        else{
                            res.status(505).json({
                                success: false,
                                message: "No Permission to Enter",
                            })
                        }

                    }
                }
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

module.exports = {checkAuthValidUser}