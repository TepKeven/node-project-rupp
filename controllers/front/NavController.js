const Product = require("../../models/admin/Product")
const {productDescriptionAssoc, orderProductAssoc, categoryDescriptionAssoc} = require("../mainController")
const TaxClass = require("../../models/admin/TaxClass");
const Order = require("../../models/admin/Order");
const Customer = require("../../models/admin/Customer");
const CustomerGroup = require("../../models/admin/CustomerGroup");
const Currency = require("../../models/admin/Currency");
const Country = require("../../models/admin/Country");
const Payment = require("../../models/admin/Payment");
const Shipment = require("../../models/admin/Shipment");
const OrderStatus = require("../../models/admin/OrderStatus");
const OrderProduct = require("../../models/admin/OrderProduct");
const Category = require("../../models/admin/Category");
const date = new Date();


// Add GET Request 
const getNavItems = async (req,res,next) => {
   
    const request = req.body;
    const cart_items = JSON.parse(request.cart_items);
    const product_ids = cart_items.map(cart_item => cart_item.product_id);
    const products = await Product.findAll({
        where: {
            product_id: product_ids
        },
        include: [productDescriptionAssoc],
    })
    
    const tax_classes = await TaxClass.findAll();

    products.map(product => {

        var tax_price = 0;

        const cart_item = cart_items.find(cart_item => cart_item.product_id == product.product_id)
        const tax_class = tax_classes.find(tax => tax.tax_class_id == product.tax_class_id)
        if(tax_class.type == "P"){
            tax_price = product.price * tax_class.rate / 100
        }
        else{
            tax_price = tax_class.rate
        }

        product.setDataValue("order_amount", cart_item.quantity)
        product.setDataValue("tax_price", tax_price)
    })

    // Category Items 
    const categories = await Category.findAll({
        include: [categoryDescriptionAssoc],
        limit: 8,
    })

    res.status(200).json({
        carts: products || [],
        categories: categories
    })
   
}



module.exports= {getNavItems};