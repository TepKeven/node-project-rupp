const Category = require("../../models/admin/Category");
const CategoryDescription = require("../../models/admin/CategoryDescription");
const {categoryDescriptionAssoc} = require("../mainController")
const DashboardItem = require("../../models/admin/DashboardItem")
const path = require("path")
const fs = require("fs");
const Session = require("../../models/admin/Session");
const User = require("../../models/admin/User");
const UserRole = require("../../models/admin/UserRole");

// get
const getSidebarItems = async (req,res,next) => {

   // var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   // var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)

   const login_token = req.cookies.login_token
   var sidebar_items = [];

   var user_session = await Session.findOne({
      where: {
          token: login_token
      }
  })

   var session_data = JSON.parse(user_session.data)

   var user_id = session_data.user_id;

   const user = await User.findByPk(user_id);

   if(user){

      const user_role = await UserRole.findByPk(user.user_role_id)

      if(user_role){
         
         const user_role_permission_id = JSON.parse(user_role.permission) || [];

         sidebar_items = await DashboardItem.findAll({
               where: {
                  dashboard_item_id: user_role_permission_id
               }
         })


      }
   }

   res.status(200).json({
      success: true,
      sidebar_items: sidebar_items.filter((sidebar_item,index) => {
         return true
      }),
   })
   
}

module.exports= {getSidebarItems};