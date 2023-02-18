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

// get
const getProducts = async (req,res,next) => {

   var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)
   

   const products = await Product.findAll({
      include: [productDescriptionAssoc],
   })

   await Promise.all(products.map(async (product) => {

      const product_categories = await ProductToCategory.findAll({
         where: {
            product_id: product.product_id
         }
      })

      const product_category_ids = product_categories.map(product_category => product_category.category_id);

      const categories = await Category.findAll({
         where: {
            category_id: product_category_ids
         },
         include: [categoryDescriptionAssoc],
      })

      product.setDataValue("categories", categories)

   }))

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

   const taxClasses = await TaxClass.findAll()
   const stockStatuses = await StockStatus.findAll()
   const manufacturers = await Manufacturer.findAll()
   const product_to_category_id = await ProductToCategory.findAll({
      where: {
         product_id: product_id
      },
      attributes:["category_id"]
   })

   res.status(200).json({
      product: product,
      categories: categories,
      taxClasses: taxClasses,
      stockStatuses: stockStatuses,
      manufacturers: manufacturers,
      product_to_category_id: product_to_category_id.map(item => item.category_id)
   })
}


// Add GET Request 
const addProductGET = async (req,res,next) => {

   const categories = await Category.findAll({
      include: [categoryDescriptionAssoc],
   })

   const manufacturers = await Manufacturer.findAll()
   const stock_statuses = await StockStatus.findAll()
   const tax_classes = await TaxClass.findAll();

   res.status(200).json({
      categories: categories,
      manufacturers: manufacturers,
      stock_statuses: stock_statuses,
      tax_classes: tax_classes
   })
}



// Add POST Request
const addProductPOST = async (req,res,next) => {

   var product_to_category_list = []
   var request = req.body
   var file = req.file

   request.product_description.forEach(product_description => {
      product_description.description = product_description.description.replace(/</g, "&lt;").replace(/>/g, "&gt;")
   })

   const product = await Product.create({
      model: request.product_model,
      quantity: request.product_quantity,
      image: file == undefined ? "" : file.filename, 
      price: request.product_price,
      subtract: request.product_subtract,
      sort_order: request.product_sort_order,
      status: request.product_status,
      product_description_assoc: request.product_description,
      manufacturer_id: request.product_manufacturer_id,
      stock_status_id: request.product_stock_status_id,
      tax_class_id: request.product_tax_class_id
   }, {
      include: [{
        association: productDescriptionAssoc,
        as: 'product_description_assoc'
      },
      ]
   })

   request.product_category_id.map(category_id => {
      product_to_category_list.push({product_id: product.product_id, category_id: category_id})
   })

   const product_to_category_items = await ProductToCategory.bulkCreate(product_to_category_list)

   res.status(200).json({
      message: "success",
      product_to_category_items: product_to_category_items,
   })
}

// Edit Product
const editProductPOST = async (req,res,next) => {

   // Update Product
   var product_to_category_list = []
   var product_id = req.params.product_id;
   var product = await Product.findByPk(product_id)

   var request = req.body
   var file = req.file
   var prevImage = path.join(__dirname, "../../", "assets/images/product/", product.image);

   var updated_product = {
      model: request.product_model,
      quantity: request.product_quantity,
      image: file == undefined ? "" : file.filename, 
      price: request.product_price,
      subtract: request.product_subtract,
      sort_order: request.product_sort_order,
      status: request.product_status,
      product_description_assoc: request.product_description,
      manufacturer_id: request.product_manufacturer_id,
      stock_status_id: request.product_stock_status_id,
      tax_class_id: request.product_tax_class_id
   }

   if(fs.existsSync(prevImage) && file != undefined){
      fs.unlink(prevImage,(err) => {
            
      })
   }

   product = Object.assign(product,updated_product);
   await product.save();


   var productDescriptions = await product.getProduct_description_assoc()
   var description_id;
   var product_description
   var updated_description;

   productDescriptions.map(async (productDescription, index) => {

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


   const affectedRows = await ProductToCategory.destroy({
      where: {
         product_id: product_id
      }
   })

   request.product_category_id.map(category_id => {
      product_to_category_list.push({product_id: product_id, category_id: category_id})
   })

   const product_to_category_items = await ProductToCategory.bulkCreate(product_to_category_list)

   res.status(200).json({"status": "success", "message": `${request.product_description[0].name} Updated Succesfully.`, category_list: product_to_category_items})   
   
}

// Delete Product
const deleteProducts = async (req,res,next) => {

   var request = req.body;

   const deletedItems = await Product.findAll({
      attributes: ["image"],
      where: {
         product_id: request.product_ids
      }
   })


   deletedItems.map((item) => {

      var imagePath = path.join(__dirname, "../../", "assets/images/product/", item.image);

      if(fs.existsSync(imagePath)){
         fs.unlink(imagePath,(err) => {
            
         })
      }
   })

   const affected_rows = await ProductDescription.destroy({
      where: {
         product_id: request.product_ids
      }
   }).then(async (rows) => {

      return await Product.destroy({
         where: {
            product_id: request.product_ids
         },
      })
   })

   res.status(200).json({
      "status": "success", "message": `Products Deleted Succesfully.`, "affected_rows": affected_rows
   })
}

module.exports= {getProducts, getProductById, addProductGET, addProductPOST, editProductPOST, deleteProducts};