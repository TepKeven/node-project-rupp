const Category = require("../../models/admin/Category");
const CategoryDescription = require("../../models/admin/CategoryDescription");
const {categoryDescriptionAssoc} = require("./mainController")
const path = require("path")
const fs = require("fs")

// get
const getCategories = async (req,res,next) => {

   var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)
   

   const categories = await Category.findAll({
      include: [categoryDescriptionAssoc],
   })

   res.status(200).json({
      categories: categories.filter((category,index) => {
         return ((end == 0) ? true : (index >= start - 1 && index <= end - 1 )) // return all or just between certain index
      }),
      length: categories.length
   })
   
}

// get by id
const getCategoryById = async  (req,res,next) => {
   var category_id = req.params.category_id
   const category = await Category.findByPk(
      category_id,
      {include: [categoryDescriptionAssoc]},
   )

   const categories = await Category.findAll({
      include: [categoryDescriptionAssoc],
   })

   res.status(200).json({
      category: category,
      categoryList: categories
   })
}

// add
const addCategoryPOST = async (req,res,next) => {

   var request = req.body
   var file = req.file

   request.category_description.forEach(category_description => {
      category_description.description = category_description.description.replace(/</g, "&lt;").replace(/>/g, "&gt;")
   })

   const category = await Category.create({
      image: file == undefined ? "" : file.filename, 
      parent_id: request.category_parent_id,
      top: request.category_top,
      sort_order: request.category_sort_order,
      status: request.category_status,
      category_description_assoc: request.category_description
   }, {
      include: [{
        association: categoryDescriptionAssoc,
        as: 'category_description_assoc'
      }]
   })

   res.status(200).json(category)

}

// edit
const editCategory = async (req,res,next) => {

   // update category
   var category_id = req.params.category_id;
   var category = await Category.findByPk(category_id)
   var request = req.body
   var file = req.file
   var prevImage = path.join(__dirname, "../../", "assets/images/category/", category.image);

   var updated_category = {
      image: file == undefined ? "" : file.filename,   // path
      parent_id: request.category_parent_id,
      top: request.category_top,
      sort_order: request.category_sort_order,
      status: request.category_status
   }

   if(fs.existsSync(prevImage) && file != undefined){
      fs.unlink(prevImage,(err) => {
            
      })
   }

   category = Object.assign(category,updated_category);
   await category.save();

   // update category description 

   var categoryDescriptions = await category.getCategory_description_assoc()
   var description_id;
   var category_description
   var updated_description;

   categoryDescriptions.map(async (categoryDescription,index) => {

      description_id = categoryDescription.category_description_id;
      category_description = await CategoryDescription.findByPk(description_id);
      updated_description = {
         name: request.category_description[index].name,
         description: request.category_description[index].description.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
         meta_title: request.category_description[index].meta_title,
         meta_description: request.category_description[index].meta_description,
         meta_keyword: request.category_description[index].meta_keyword
      }
      category_description = Object.assign(category_description,updated_description);
      await category_description.save()
   })

   res.status(200).json({"status": "success", "message": `${request.category_description[0].name} Updated Succesfully.`})   
   
}

// delete
const deleteCategories = async (req,res,next) => {

   var request = req.body;

   const deletedItems = await Category.findAll({
      attributes: ["image"],
      where: {
         category_id: request.ids
      }
   })


   deletedItems.map((item) => {

      var imagePath = path.join(__dirname, "../../", "assets/images/category/", item.image);

      if(fs.existsSync(imagePath)){
         fs.unlink(imagePath,(err) => {
            
         })
      }
   })

   const affected_rows = await CategoryDescription.destroy({
      where: {
         category_id: request.ids
      }
   }).then(async (rows) => {

      return await Category.destroy({
         where: {
            category_id: request.ids
         },
      })
   })

   res.status(200).json({
      "status": "success", "message": `Categories Deleted Succesfully.`, "affected_rows": affected_rows
   })
}

module.exports= {getCategories, getCategoryById, addCategoryPOST, editCategory, deleteCategories};