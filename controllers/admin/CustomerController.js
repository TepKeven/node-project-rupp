const path = require("path")
const fs = require("fs");
const Customer = require("../../models/admin/Customer");
const CustomerGroup = require("../../models/admin/CustomerGroup");
const bcrypt = require("bcrypt");
const Address = require("../../models/admin/Address");
const Country = require("../../models/admin/Country")

// get
const getCustomers = async (req,res,next) => {

   var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)
   

   const customers = await Customer.findAll()

   res.status(200).json({
      customers: customers.filter((customer,index) => {
         return ((end == 0) ? true : (index >= start - 1 && index <= end - 1 )) // return all or just between certain index
      }),
      length: customers.length
   })
   
}

// get by id
const getCustomerById = async  (req,res,next) => {

   var customer_id = req.params.customer_id
   const customer = await Customer.findByPk(customer_id)
   const countries = await Country.findAll();

   const addresses = await Address.findAll({
      where: {
         customer_id: customer_id
      }
   })

   const customer_groups = await CustomerGroup.findAll()

   res.status(200).json({
      customer: customer,
      addresses: addresses,
      customer_groups: customer_groups,
      countries: countries
   })
}


// Add GET Request 
const addCustomerGET = async (req,res,next) => {

   const customer_groups = await CustomerGroup.findAll()
   const countries = await Country.findAll()

   res.status(200).json({
      customer_groups: customer_groups,
      countries: countries
   })
}



// Add POST Request
const addCustomerPOST = async (req,res,next) => {

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
      customer_group_id: request.customer_customer_group_id,
      first_name: request.customer_firstname,
      last_name: request.customer_lastname,
      email: request.customer_email,
      telephone: request.customer_telephone,
      image: file == undefined ? "" : file.filename, 
      password: encrytedPassword,
      salt: saltString,
      newsletter: request.customer_newsletter,
      address_id: 0,
      ip: req.ip, 
      status: request.customer_status
   })

   if(request.address_description != null){

      request.address_description.map(address => {
         address.customer_id = customer.customer_id
      })

      addressList = await Address.bulkCreate(request.address_description)
   }

   res.status(200).json({
      message: "success",
      customer: customer,
      addresses: addressList
   })
}

// Edit Customer
const editCustomerPOST = async (req,res,next) => {

   // Update Customer
   var customer_id = req.params.customer_id
   var customer = await Customer.findByPk(customer_id)
   var request = req.body
   var file = req.file
   var saltString;
   var encrytedPassword;
   var addressList;
   var prevImage = path.join(__dirname, "../../", "assets/images/customer/", customer.image);

   encrytedPassword = await bcrypt.genSalt(10).then(salt => {
      saltString = salt
      return bcrypt.hash(request.customer_password, saltString)
   })

   var updated_customer = {
      customer_group_id: request.customer_customer_group_id,
      first_name: request.customer_firstname,
      last_name: request.customer_lastname,
      email: request.customer_email,
      telephone: request.customer_telephone,
      image: file == undefined ? "" : file.filename, 
      password: encrytedPassword,
      salt: saltString,
      newsletter: request.customer_newsletter,
      address_id: 0,
      ip: req.ip, 
      status: request.customer_status
   }

   if(fs.existsSync(prevImage) && file != undefined){
      fs.unlink(prevImage,(err) => {
            
      })
   }

   customer = Object.assign(customer,updated_customer);
   await customer.save();

   const affected_rows = await Address.destroy({
      where: {
         customer_id: customer_id
      }
   })

   if(request.address_description != null){

      request.address_description.map(address => {
         address.customer_id = customer_id
      })

      addressList = await Address.bulkCreate(request.address_description)
   }

   res.status(200).json({"status": "success", "message": `${customer.first_name} ${customer.last_name} Customer Updated Succesfully.`, addressList: addressList})   
   
}

// Delete Customer
const deleteCustomers = async (req,res,next) => {

   var request = req.body;

   const deletedItems = await Customer.findAll({
      attributes: ["image"],
      where: {
         customer_id: request.customer_ids
      }
   })


   deletedItems.map((item) => {

      var imagePath = path.join(__dirname, "../../", "assets/images/customer/", item.image);

      if(fs.existsSync(imagePath)){
         fs.unlink(imagePath,(err) => {
            
         })
      }
   })

   const affected_rows = await Address.destroy({
      where: {
         customer_id: request.customer_ids
      }
   }).then(async (rows) => {

      return await Customer.destroy({
         where: {
            customer_id: request.customer_ids
         },
      })
   })



   res.status(200).json({
      "status": "success", "message": `${affected_rows} Customers Deleted Succesfully.`, "affected_rows": affected_rows
   })
}

module.exports= {getCustomers, getCustomerById, addCustomerGET, addCustomerPOST, editCustomerPOST, deleteCustomers};