const Product = require("../../models/admin/Product")
const ProductDescription = require("../../models/admin/ProductDescription");
const {categoryDescriptionAssoc, productDescriptionAssoc} = require("../mainController")
const path = require("path")
const fs = require("fs");
const Category = require("../../models/admin/Category");
const Manufacturer = require("../../models/admin/Manufacturer");
const StockStatus = require("../../models/admin/StockStatus");
const TaxClass = require("../../models/admin/TaxClass");
const ProductToCategory = require("../../models/admin/ProductToCategory");
const Setting = require("../../models/admin/Setting");
const OrderStatus = require("../../models/admin/OrderStatus");

// get Setting
const getWebsiteSetting = async  (req,res,next) => {

   const setting = await Setting.findOne();
   const order_statuses = await OrderStatus.findAll();

   res.status(200).json({
      status: "success",  
      setting: setting,
      order_statuses: order_statuses
   })   
}


// Edit Setting
const editWebsiteSetting = async (req,res,next) => {

   const request = req.body;
   const files = req.files;

   var setting = await Setting.findOne();
   const prevStoreImage = path.join(__dirname, "../../", "assets/images/product/", setting.image || "");
   const prevStoreLogo = path.join(__dirname, "../../", "assets/images/product/", setting.store_logo || "");
   const prevStoreIcon = path.join(__dirname, "../../", "assets/images/product/", setting.store_icon || "");

   var updated_setting = {
      meta_title: request.setting_meta_title,
      meta_description: request.setting_meta_description,
      meta_keyword: request.setting_meta_keyword,
      store_name: request.setting_store_name,
      store_owner: request.setting_store_owner,
      store_address: request.setting_store_address,
      email: request.setting_store_email,
      telephone: request.setting_store_telephone,
      fax: request.setting_store_fax,
      // image: request.setting_store_image,
      order_status_id: request.setting_order_status,
      // store_logo: request.setting_store_logo,
      // store_icon: request.setting_store_icon
   }

   if(files.setting_store_image != undefined){

      setting.image = files.setting_store_image[0].filename      

      if(fs.existsSync(prevStoreImage)){
         fs.unlink(prevStoreImage,(err) => {
               
         })
      }
   }

   if(files.setting_store_logo != undefined){

      setting.store_logo = files.setting_store_logo[0].filename

      if(fs.existsSync(prevStoreLogo)){
         fs.unlink(prevStoreLogo,(err) => {
               
         })
      }
   }

   if(files.setting_store_icon != undefined){

      setting.store_icon = files.setting_store_icon[0].filename

      if(fs.existsSync(prevStoreIcon)){
         fs.unlink(prevStoreIcon,(err) => {
               
         })
      }
   }

   setting = Object.assign(setting,updated_setting);
   await setting.save();
   
   res.status(200).json({
      status: "success",  
      setting: setting,
   })   
}

module.exports= {getWebsiteSetting, editWebsiteSetting};