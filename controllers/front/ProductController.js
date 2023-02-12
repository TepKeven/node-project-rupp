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
   const tax_classes = await TaxClass.findAll();

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

   const category = await Category.findByPk(category_ids[0],{
      include: [categoryDescriptionAssoc],
   })

   const taxClass = await TaxClass.findByPk(product.tax_class_id)
   const stockStatus = await StockStatus.findByPk(product.stock_status_id)
   const manufacturer = await Manufacturer.findByPk(product.manufacturer_id)

   if(taxClass.type == "P"){
      product.setDataValue('tax_price',taxClass.rate * product.price / 100)
   }
   else{
      product.setDataValue('tax_price',taxClass.rate)
   }

   product.setDataValue("stock_status", stockStatus.name)
   product.setDataValue("manufacturer", manufacturer.name)

   // Related Products
   const product_to_categories = await ProductToCategory.findAll({
      where: {
         category_id: category_ids[0]
      }
   })

   const related_product_ids = product_to_categories.map(product => product.product_id)

   const related_products = await Product.findAll({
      where: {
         product_id: related_product_ids
      },
      include: [productDescriptionAssoc],
   })

   related_products.map(product => {

      var tax_price = 0;
      const tax_class = tax_classes.find(tax => tax.tax_class_id == product.tax_class_id)

      if(tax_class.type == "P"){
          tax_price = product.price * tax_class.rate / 100
      }
      else{
          tax_price = tax_class.rate
      }

      product.setDataValue("tax_price", tax_price)
  })


   res.status(200).json({
      product: product,
      category: category,
      related_products: related_products
   })
}


module.exports= {getProducts, getProductById};