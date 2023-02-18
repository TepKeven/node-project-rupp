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
const Session = require("../../models/admin/Session");
const bcrypt = require("bcrypt");
const date = new Date();


// Add GET Request 
const addOrderGET = async (req,res,next) => {
   
   const request = req.body
   const countries = await Country.findAll();
   const payments = await Payment.findAll();
   const shipments = await Shipment.findAll();
   const customer_login_token = req.cookies.customer_login_token || null
   const cart_items = JSON.parse(request.cart_items);
   const product_ids = cart_items.map(cart_item => cart_item.product_id);
   const product_list = await Product.findAll({
      where: {
         product_id: product_ids
      },
      include: [productDescriptionAssoc],
   })

   await Promise.all(product_list.map(async (product) => {

      var selected_product;
      const tax = await TaxClass.findByPk(product.tax_class_id)
      selected_product = cart_items.find(cart_item => cart_item.product_id == product.product_id)

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


   res.status(200).json({
      products: product_list,
      countries: countries,
      payments: payments,
      shipments: shipments,
      customer_login_token: customer_login_token
   })
}


// Add POST Request
const addOrderPOST = async (req,res,next) => {

   var request = req.body
   var customer_id = null;
   var saltString;
   var encrytedPassword;

   if(req.cookies.customer_login_token == null) {

      if(request.order_create_account == 1){

         // Customer 
         encrytedPassword = await bcrypt.genSalt(10).then(salt => {
            saltString = salt
            return bcrypt.hash(request.order_password, saltString)
         })

         const customer = await Customer.create({
            customer_group_id: 1,
            first_name: request.order_first_name,
            last_name: request.order_last_name,
            email: request.order_email,
            telephone: request.order_telephone,
            image: "", 
            password: encrytedPassword,
            salt: saltString,
            newsletter: 1,
            address_id: 0,
            ip: req.ip, 
            status: 1
         })

         customer_id = customer.customer_id;
      }
   }
   else{
      const session = await Session.findOne({
         where: {
            token: req.cookies.customer_login_token,
            is_customer: 1
         }
      })

      if(session){

         const customer = await Customer.findOne({
            where: {
               email: session.email
            }
         })

         customer_id = customer.customer_id
      }
   }

   // Order 
   var cart_items = JSON.parse(request.cart_items) // request.cart_items
   var cart_product_ids = cart_items.map(cart_item => cart_item.product_id)
   const country = await Country.findByPk(request.order_country_id);
   var order_product_list = []

   var product_list = await Product.findAll({
      where: {
         product_id: cart_product_ids
      },
      include: [productDescriptionAssoc],
   })


   await Promise.all(product_list.map(async (product) => {

         var selected_product;
         const tax = await TaxClass.findByPk(product.tax_class_id)
         selected_product = cart_items.find(cart_item => cart_item.product_id == product.product_id)

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

   const total_price_tax = product_list.reduce((total,product) => (parseFloat(product.price) + parseFloat(product.getDataValue("tax"))) * parseFloat(product.getDataValue("purchase_quantity")) + total ,0)

   const order = await Order.create({
      invoice_prefix: `INV-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${request.order_first_name}`,
      store_id: 1,
      store_name: process.env.STORE_NAME,
      customer_id: customer_id,
      first_name: request.order_first_name,
      last_name: request.order_last_name,
      email: request.order_email,
      telephone: request.order_telephone,
      company: request.order_company,
      address: request.order_address,
      city: request.order_city,
      country: country.name,
      country_id: request.order_country_id,
      payment_id: request.order_payment_id,
      shipping_id: request.order_shipping_id,
      total: total_price_tax,
      order_status_id: 1,
      currency_id: 1,
      ip: req.ip,
      payslip: request.order_payslip == null ? "" : request.order_payslip
   })

   // res.status(200).json(product_list)

   // Order Products
   product_list.map(product => {

      // var selected_product = cart_items.find(cart_item => cart_item.product_id == product.product_id)

      var order_product = {
         order_id: order.order_id,
         product_id: product.product_id,
         name: product.product_description_assoc[0].name,
         model: product.model,
         quantity: product.getDataValue("purchase_quantity"),
         price: product.price,
         total: (parseFloat(product.price) + parseFloat(product.getDataValue("tax"))) * parseFloat(product.getDataValue("purchase_quantity")),
         tax: product.getDataValue("tax")
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