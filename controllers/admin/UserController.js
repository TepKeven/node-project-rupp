const path = require("path")
const fs = require("fs");
const bcrypt = require("bcrypt");
const User = require("../../models/admin/User");
const UserRole = require("../../models/admin/UserRole");

// get
const getUsers = async (req,res,next) => {

   var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)
   

   const users = await User.findAll()

   res.status(200).json({
      users: users.filter((user,index) => {
         return ((end == 0) ? true : (index >= start - 1 && index <= end - 1 )) // return all or just between certain index
      }),
      length: users.length
   })
   
}

// get by id
const getUserById = async  (req,res,next) => {

   var user_id = req.params.user_id
   const user = await User.findByPk(user_id)

   const user_roles = await UserRole.findAll();

   res.status(200).json({
      user: user,
      user_roles: user_roles
   })
}


// Add GET Request 
const addUserGET = async (req,res,next) => {

   const user_roles = await UserRole.findAll()

   res.status(200).json({
      user_roles: user_roles
   })
}



// Add POST Request
const addUserPOST = async (req,res,next) => {

   var request = req.body
   var file = req.file
   var saltString;
   var encrytedPassword;

   encrytedPassword = await bcrypt.genSalt(10).then(salt => {
      saltString = salt
      return bcrypt.hash(request.user_password, saltString)
   })

   const user = await User.create({
      user_role_id: request.user_user_role_id,
      username: request.user_username,
      password: encrytedPassword,
      salt: saltString,
      first_name: request.user_firstname,
      last_name: request.user_lastname,
      email: request.user_email,
      image: file == undefined ? "" : file.filename, 
      code: "",
      ip: req.ip, 
      status: request.user_status
   })

   res.status(200).json({
      message: "success",
      user: user,
   })
}

// Edit User
const editUserPOST = async (req,res,next) => {

   // Update User
   var user_id = req.params.user_id
   var user = await User.findByPk(user_id)
   var request = req.body
   var file = req.file
   var saltString;
   var encrytedPassword;
   var prevImage = path.join(__dirname, "../../", "assets/images/user/", user.image);

   var updated_user = {
      user_role_id: request.user_user_role_id,
      username: request.user_username,
      first_name: request.user_firstname,
      last_name: request.user_lastname,
      email: request.user_email,
      image: file == undefined ? "" : file.filename, 
      code: "",
      ip: req.ip, 
      status: request.user_status
   }

   if(fs.existsSync(prevImage) && file != undefined){
      fs.unlink(prevImage,(err) => {
            
      })
   }

   user = Object.assign(user,updated_user);
   
   if(request.user_password.length > 0){

      encrytedPassword = await bcrypt.genSalt(10).then(salt => {
         saltString = salt
         return bcrypt.hash(request.user_password, saltString)
      })

      user.password = encrytedPassword;
      user.salt = saltString;
   }

   await user.save();

   res.status(200).json({"status": "success", "message": `${user.first_name} ${user.last_name} User Updated Succesfully.`})   
   
}

// Delete User
const deleteUsers = async (req,res,next) => {

   var request = req.body;

   const deletedItems = await User.findAll({
      attributes: ["image"],
      where: {
         user_id: request.user_ids
      }
   })


   deletedItems.map((item) => {

      var imagePath = path.join(__dirname, "../../", "assets/images/user/", item.image);

      if(fs.existsSync(imagePath)){
         fs.unlink(imagePath,(err) => {
            
         })
      }
   })

   const affected_rows = await User.destroy({
      where: {
         user_id : request.user_ids
      }
   })

   res.status(200).json({
      "status": "success", "message": `${affected_rows} Users Deleted Succesfully.`, "affected_rows": affected_rows
   })
}

module.exports= {getUsers,addUserGET, addUserPOST,getUserById, editUserPOST, deleteUsers};