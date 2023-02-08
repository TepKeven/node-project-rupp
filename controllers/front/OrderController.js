const Product = require("../../models/admin/Product")
const {productDescriptionAssoc, orderProductAssoc} = require("../mainController")
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
const date = new Date();


// Add GET Request 
const addOrderGET = async (req,res,next) => {
   
   const countries = await Country.findAll();
   const payments = await Payment.findAll();
   const shipments = await Shipment.findAll();

   res.status(200).json({
      countries: countries,
      payments: payments,
      shipments: shipments
   })
}


// Add POST Request
const addOrderPOST = async (req,res,next) => {

   var request = req.body
   var order_products_quantity = JSON.parse(request.order_products_quantity) // request.order_products_quantity
   var order_product_ids = order_products_quantity.map(order_product_quantity => order_product_quantity.product_id)
   const countries = await Country.findAll();
   var order_product_list = []

   var product_list = await Product.findAll({
      where: {
         product_id: order_product_ids
      }
   })


   await Promise.all(product_list.map(async (product) => {

         var selected_product;
         const tax = await TaxClass.findByPk(product.tax_class_id)
         selected_product = order_products_quantity.find(order_product_quantity => order_product_quantity.product_id == product.product_id)
         var tax_price = 0;
         if(tax){
            if(tax.type == "P"){
               tax_price = product.price * tax.rate / 100;
            }
            else{
               tax_price = tax.rate
            }
            
         }

         product.setDataValue("tax", tax_price)
         product.setDataValue("purchase_quantity", selected_product.quantity)
      })
   )

   const total_price_tax = product_list.reduce((total,product) => (parseFloat(product.price) + parseFloat(product.tax)) * parseFloat(product.purchase_quantity) + total ,0)

   const order = await Order.create({
      invoice_prefix: `INV-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${request.order_first_name}`,
      store_id: 1,
      store_name: process.env.STORE_NAME,
      customer_id: request.order_customer_id == 0 ? null : request.order_customer_id ,
      first_name: request.order_first_name,
      last_name: request.order_last_name,
      email: request.order_email,
      telephone: request.order_telephone,
      company: request.order_company,
      address: request.order_address,
      city: request.order_city,
      country: countries.find(country => country.country_id == request.order_country_id).name,
      country_id: request.order_country_id,
      payment_id: request.order_payment_id,
      shipping_id: request.order_shipment_id,
      total: total_price_tax,
      order_status_id: request.order_order_status_id,
      currency_id: request.order_currency_id,
      ip: req.ip,
      payslip: request.order_payslip == null ? "" : request.order_payslip
   })

   product_list.map(product => {

      var order_product = {
         order_id: order.order_id,
         product_id: product.product_id,
         name: product.name,
         model: product.model,
         quantity: product.quantity,
         price: product.price,
         total: (parseFloat(product.price) + parseFloat(product.tax)) * parseFloat(product.quantity),
         tax: product.tax
      }

      order_product_list.push(order_product)
   })

   const order_products = await OrderProduct.bulkCreate(order_product_list)

   res.status(200).json({
      status: "Success", 
      message: "Order Successfully",
      order: order,
      order_products: order_products
   })
   
}

module.exports= {addOrderGET, addOrderPOST};