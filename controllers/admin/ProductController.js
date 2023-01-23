const Product = require("../../models/admin/Product")
const ProductDescription = require("../../models/admin/ProductDescription");
const {categoryDescriptionAssoc, productDescriptionAssoc} = require("./mainController")
const path = require("path")
const fs = require("fs")

// get
const getProducts = async (req,res,next) => {

   var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)
   

   const products = await Product.findAll({
      include: [productDescriptionAssoc],
   })

   res.status(200).json({
      products: products.filter((product,index) => {
         return ((end == 0) ? true : (index >= start - 1 && index <= end - 1 )) // return all or just between certain index
      }),
      length: products.length
   })
   
}

// get by id
const getProductById = async  (req,res,next) => {
   var product_id = req.params.product_id
   const product = await Product.findByPk(
      product_id,
      {include: [productDescriptionAssoc]},
   )

   const categories = await Category.findAll({
      include: [categoryDescriptionAssoc],
   })

   res.status(200).json({
      product: product,
      categoryList: categories
   })
}

// add
const addProduct = async (req,res,next) => {

   var request = req.body
   var file = req.file

   request.product_description.forEach(product_description => {
      product_description.description = product_description.description.replace(/</g, "&lt;").replace(/>/g, "&gt;")
   })

   const product = await Product.create({
      model: request.product_model,
      quantity: request.product_quantity,
      stock_status_id: request.product_stock_status_id,
      image: file == undefined ? "" : file.filename, 
      manufacturer_id: request.product_manufacturer_id,
      price: request.product_price,
      tax_class_id: request.product_tax_class_id,
      subtract: request.product_subtract,
      sort_order: request.product_sort_order,
      status: request.product_status,
      category_description_assoc: request.product_description
   }, {
      include: [{
        association: productDescriptionAssoc,
        as: 'product_description_assoc'
      }]
   })

   res.status(200).json(product)

}

// edit
const editProduct = async (req,res,next) => {

   // update category
   var product_id = req.params.product_id;
   var product = await Category.findByPk(product_id)
   var request = req.body
   var file = req.file
   var prevImage = path.join(__dirname, "../../", "assets/images/category/", product.image);

   var updated_product = {
      
   }

   if(fs.existsSync(prevImage) && file != undefined){
      fs.unlink(prevImage,(err) => {
            
      })
   }

   product = Object.assign(product,updated_product);
   await product.save();

   // update category description 

   var productDescriptions = await category.getProduct_description_assoc()
   var description_id;
   var product_description
   var updated_description;

   productDescriptions.map(async (productDescription,index) => {

      description_id = productDescription.product_description_id;
      product_description = await ProductDescription.findByPk(description_id);
      updated_description = {
         name: request.product_description[index].name,
         description: request.product_description[index].description.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
         meta_title: request.product_description[index].meta_title,
         meta_description: request.product_description[index].meta_description,
         meta_keyword: request.product_description[index].meta_keyword
      }
      product_description = Object.assign(product_description,updated_description);
      await product_description.save()
   })

   res.status(200).json({"status": "success", "message": `${request.product_description[0].name} Updated Succesfully.`})   
   
}

// delete
const deleteProducts = async (req,res,next) => {

   var request = req.body;

   const deletedItems = await Product.findAll({
      attributes: ["image"],
      where: {
         product_id: request.ids
      }
   })


   deletedItems.map((item) => {

      var imagePath = path.join(__dirname, "../../", "assets/images/category/", item.image);

      if(fs.existsSync(imagePath)){
         fs.unlink(imagePath,(err) => {
            
         })
      }
   })

   const affected_rows = await ProductDescription.destroy({
      where: {
         product_id: request.ids
      }
   }).then(async (rows) => {

      return await Product.destroy({
         where: {
            product_id: request.ids
         },
      })
   })

   res.status(200).json({
      "status": "success", "message": `Categories Deleted Succesfully.`, "affected_rows": affected_rows
   })
}

module.exports= {getProducts, getProductById, addProduct, editProduct, deleteProducts};