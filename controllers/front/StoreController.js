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
const OrderProduct = require("../../models/admin/OrderProduct");
const { Sequelize, Op } = require("sequelize");

// get
const getStoreItems = async (req,res,next) => {

   var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)
   var searchParam = req.query.search
   var category_id = req.query.category
   var products;

   if(category_id == 0){
      
      products = await Product.findAll({
         include: [{
            model: ProductDescription,
            as: "product_description_assoc",
            where: {
               name: {
                  [Op.like]: `%${searchParam}%`
               },
               
            }
         }]
      })
   }
   else{

      const product_to_category = await ProductToCategory.findAll({
         attributes: ["product_id"],
         where: {
            category_id: category_id
         }
      })

      const product_ids = product_to_category.map(product => product.product_id)

      products = await Product.findAll({
         where: {
            product_id: product_ids
         },
         include: [{
            model: ProductDescription,
            as: "product_description_assoc",
            where: {
               name: {
                  [Op.like]: `%${searchParam}%`
               },
               
            }
         }]
      })
   }

   await Promise.all(products.map(async (product) => {

         const tax = await TaxClass.findByPk(product.tax_class_id)
         var tax_price = 0;

         if(tax){
            if(tax.type == "P"){
               tax_price = product.price * tax.rate / 100;
            }
            else{
               tax_price = tax.rate
            }
            
         }

         product.setDataValue("tax_price", tax_price)
      })
   )

   const categories = await Category.findAll({
      include: [categoryDescriptionAssoc]
   })

   const manufacturers = await Manufacturer.findAll({
      order: [['sort_order','asc']]
   });


   const top_selling_products = await OrderProduct.findAll({
      attributes: [
         "product_id"
      ],
      group: ['product_id'],
      order: [[Sequelize.fn("COUNT", Sequelize.cast(Sequelize.col("product_id"), 'integer')),'DESC']]
   })

   const product_ids = top_selling_products.map(top_selling_product => top_selling_product.product_id);

   const top_sellings = await Product.findAll({
      where: {
         product_id: product_ids
      },
      include: [productDescriptionAssoc]
   })


   res.status(200).json({
      top_sellings: top_sellings,
      categories: categories,
      manufacturers: manufacturers,
      products: products.filter((product,index) => {
         return ((end == 0) ? true : (index >= start - 1 && index <= end - 1 )) // return all or just between certain index
      }),
      length: products.length
   })
   
}

module.exports= {getStoreItems};