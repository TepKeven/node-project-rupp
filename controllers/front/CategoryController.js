const Category = require("../../models/admin/Category");
const {categoryDescriptionAssoc, productDescriptionAssoc} = require("../mainController")
const path = require("path")
const fs = require("fs");
const Product = require("../../models/admin/Product");
const ProductToCategory = require("../../models/admin/ProductToCategory");
const TaxClass = require("../../models/admin/TaxClass");


const getProductsByCategoryID = async  (req,res,next) => {

   var category_id = req.params.category_id
   var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)

   const product_to_categories = await ProductToCategory.findAll({
        where: {
            category_id: category_id
        }
   })

   const product_ids = product_to_categories.map(product_to_category => {
        return product_to_category.product_id
   })

   const products = await Product.findAll({
        where: {
            product_id: product_ids,
        },
        include: [productDescriptionAssoc],
   })

    await Promise.all(products.map(async (product) => {

        const tax_class = await TaxClass.findByPk(product.tax_class_id)
        var tax_price;

        if(tax_class){

            // P Stands for Percentage and F stands for Fixed Price
            if(tax_class.type == "P"){
                tax_price = product.price * tax_class.rate / 100
            }
            else{
                tax_price = tax_class.rate
            }

            product.setDataValue("tax_price", tax_price)
        }

        else{
            product.setDataValue("tax_price", 0)
        }
    }))

    const category = await Category.findByPk(
        category_id,
        {include: [categoryDescriptionAssoc]} // Include Data from Category Description Table
    )

    res.status(200).json({
        products: products.filter((product,index) => {
            return ((end == 0) ? true : (index >= start - 1 && index <= end - 1 )) // return all or just between certain index
        }),
        category: category
   })
}

module.exports= {getProductsByCategoryID};