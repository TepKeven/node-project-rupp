const Product = require("../../models/admin/Product")
const {categoryDescriptionAssoc, productDescriptionAssoc} = require("../mainController")
const Category = require("../../models/admin/Category");
const Manufacturer = require("../../models/admin/Manufacturer");
const StockStatus = require("../../models/admin/StockStatus");
const TaxClass = require("../../models/admin/TaxClass");
const ProductToCategory = require("../../models/admin/ProductToCategory");
const e = require("express");

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
   })
   
}

// get Product by id
const getProductById = async  (req,res,next) => {

   var product_id = req.params.product_id

   const product = await Product.findByPk(
      product_id,
      {include: [productDescriptionAssoc]},
   )

   const product_categories = await ProductToCategory.findAll({
      attributes: ["category_id"],
      where: {
        product_id: product_id
      },
      raw: true
   })

   const category_ids = product_categories.map(product_category => product_category.category_id)

   const categories = await Category.findAll({
        where: {
            category_id: category_ids
        },
        include: [categoryDescriptionAssoc],
   })

   const taxClass = await TaxClass.findByPk(product.tax_class_id)
   const stockStatus = await StockStatus.findByPk(product.stock_status_id)
   const manufacturer = await Manufacturer.findByPk(product.manufacturer_id)

   if(taxClass.type == "P"){
      product.setDataValue('tax_value',taxClass.rate * product.price / 100)
   }
   else{
      product.setDataValue('tax_value',taxClass.rate)
   }

   product.setDataValue("stock_status", stockStatus.name)
   product.setDataValue("manufacturer", manufacturer.name)


   res.status(200).json({
      product: product,
      categories: categories,
   })
}


module.exports= {getProducts, getProductById};