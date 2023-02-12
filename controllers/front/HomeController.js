const Product = require("../../models/admin/Product")
const {categoryDescriptionAssoc, productDescriptionAssoc} = require("../mainController")
const Category = require("../../models/admin/Category");
const Manufacturer = require("../../models/admin/Manufacturer");
const StockStatus = require("../../models/admin/StockStatus");
const TaxClass = require("../../models/admin/TaxClass");
const ProductToCategory = require("../../models/admin/ProductToCategory");
const e = require("express");

// get
const getHomeItems = async (req,res,next) => {

   const recent_products = await Product.findAll({
      include: [productDescriptionAssoc],
      limit: 8,
      order: [["createdAt", "DESC"]]
   })

   const tax_classes = await TaxClass.findAll();

   recent_products.map(product => {

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
        recent_products: recent_products
    })

}
module.exports= {getHomeItems};