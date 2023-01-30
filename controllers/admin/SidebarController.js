const Category = require("../../models/admin/Category");
const CategoryDescription = require("../../models/admin/CategoryDescription");
const {categoryDescriptionAssoc} = require("./mainController")
const DashboardItem = require("../../models/admin/DashboardItem")
const path = require("path")
const fs = require("fs")

// get
const getSidebarItems = async (req,res,next) => {

   var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)
   

   const sidebar_items = await DashboardItem.findAll()

   res.status(200).json({
      sidebar_items: sidebar_items.filter((sidebar_item,index) => {
         return ((end == 0) ? true : (index >= start - 1 && index <= end - 1 )) // return all or just between certain index
      }),
   })
   
}

module.exports= {getSidebarItems};