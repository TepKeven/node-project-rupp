const path = require("path")
const fs = require("fs");
const bcrypt = require("bcrypt");
const User = require("../../models/admin/User");
const UserRole = require("../../models/admin/UserRole");
const DashboardItem = require("../../models/admin/DashboardItem");

// get
const getUserRoles = async (req,res,next) => {

   var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)
   

   const user_roles = await UserRole.findAll()

   res.status(200).json({
      user_roles: user_roles.filter((user_role,index) => {
         return ((end == 0) ? true : (index >= start - 1 && index <= end - 1 )) // return all or just between certain index
      }),
      length: user_roles.length
   })
   
}

// get by id
const getUserRoleById = async  (req,res,next) => {

   var user_role_id = req.params.user_role_id
   const user_role = await UserRole.findByPk(user_role_id)

   const dashboard_items = await DashboardItem.findAll();

   res.status(200).json({
      user_role: user_role,
      dashboard_items: dashboard_items
   })
}


// Add GET Request 
const addUserRoleGET = async (req,res,next) => {

    const dashboard_items = await DashboardItem.findAll();

   res.status(200).json({
        dashboard_items: dashboard_items
   })
}



// Add POST Request
const addUserRolePOST = async (req,res,next) => {

   var request = req.body

   const user_role = await UserRole.create({
      name: request.user_role_name,
      permission: request.user_role_permissions,
      sort_order: request.user_role_sort_order,
      status: request.user_role_status
   })

   res.status(200).json({
      message: "success",
      user_role: user_role,
   })
}

// Edit User
const editUserRolePOST = async (req,res,next) => {

   // Update User Role
   var user_role_id = req.params.user_role_id
   var user_role = await UserRole.findByPk(user_role_id)
   var request = req.body

   var updated_user_role = {
      name: request.user_role_name,
      permission: request.user_role_permissions,
      sort_order: request.user_role_sort_order,
      status: request.user_role_status
   }

   user_role = Object.assign(user_role, updated_user_role);

   await user_role.save();

   res.status(200).json({"status": "success", "message": `${user_role.name} User Role Updated Succesfully.`})   
   
}

// Delete User
const deleteUserRoles = async (req,res,next) => {

   var request = req.body;

   const affected_rows = await UserRole.destroy({
      where: {
         user_role_id: request.user_role_ids
      }
   })

   res.status(200).json({
      "status": "success", "message": `${affected_rows} User Roles Deleted Succesfully.`, "affected_rows": affected_rows
   })
}

module.exports= {getUserRoles,addUserRoleGET, addUserRolePOST,getUserRoleById, editUserRolePOST, deleteUserRoles};