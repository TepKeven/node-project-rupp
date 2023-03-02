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
const { sendMailAdmin } = require("./ContactController");
const { getMailOptionsReceive, transporter, getMailOptionsSend } = require("../../nodemailer");
const { response } = require("express");
const date = new Date();
require('dotenv').config();


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

   sendMailOrder(order, order_products).then(response => {

      res.status(200).json({
         status: "Success", 
         message: "Order Successfully",
         order: order,
         order_products: order_products
      })
   })
   
}

const sendMailOrder = async (order_info, order_products) => {

   const payment_method = await Payment.findByPk(order_info.payment_id)
   const shipping_method = await Shipment.findByPk(order_info.shipping_id)
   const order_status = await OrderStatus.findByPk(1)

   const htmlEmailSendFormat = `
   <div>
      <p>Thank you for purchasing these products. Your order has been created. We will process your order as soon as possible after receiving your payment.</p>

      <table style="border-collapse:collapse;width:100%;border-top:1px solid #dddddd;border-left:1px solid #dddddd;margin-bottom:20px">
         <thead>
            <tr>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:left;padding:7px;color:#222222" colspan="2"> Order Information </td>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"> <b>Order number:</b> ${order_info.order_id}<br> 
                  <b>Order date:</b> ${new Date(order_info.createdAt).toLocaleDateString()}<br>
                  <b>Payment method:</b> ${payment_method.name}<br> 
                  <b>Shipping Method:</b> ${shipping_method.name}
               </td>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"> <b>E-mail:</b> <a href=${`mailto:${order_info.email}`} target="_blank">${order_info.email}</a><br> 
                  <b>Contact number:</b> ${order_info.telephone}<br> 
                  <b>IP address:</b> ${order_info.ip == "::1" ? "127.0.0.1" : order_info.ip}<br> 
                  <b>Order Status:</b> ${order_status.name} <br>
               </td>
            </tr>
         </tbody>
      </table>
      <table style="border-collapse:collapse;width:100%;border-top:1px solid #dddddd;border-left:1px solid #dddddd;margin-bottom:20px;"> 
         <thead>
            <tr>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> Product </td>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> Quantity </td>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> Price </td>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> Tax </td>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> Total </td>
            </tr>
         </thead>
         <tbody>
            ${order_products.map(order_product => (
               `<tr>
                  <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> ${order_product.name} </td>
                  <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> ${order_product.quantity} </td>
                  <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> $${order_product.price} </td>
                  <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> $${order_product.tax} </td>
                  <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> $${order_product.total} </td>
               </tr>`
            ))}
            <tr>
               <td colspan="4" style="text-align:left;padding-left:10px;">
                  Total Price
               </td>
               <td style="text-align:center;">
                  $${order_products.reduce((total,product) => parseFloat(product.price) * parseFloat(product.quantity) + total ,0)}
               </td>
            </tr>
            <tr>
               <td colspan="4" style="text-align:left;padding-left:10px;">
                  Total Tax
               </td>
               <td style="text-align:center;">
                  $${order_products.reduce((total,product) => parseFloat(product.tax) * parseFloat(product.quantity) + total ,0)}
               </td>
            </tr>
            <tr>
               <td colspan="4" style="text-align:left;padding-left:10px;">
                  Total Price & Tax
               </td>
               <td style="text-align:center;">
                  $${order_products.reduce((total,product) => (parseFloat(product.price) + parseFloat(product.tax)) * parseFloat(product.quantity) + total ,0)}
               </td>
            </tr>
         </tbody>
      </table>
      <p>If you have any questions, please reply directly to this email.</p>
   </div>
   `

   const htmlEmailReceiveFormat = `
   <div>
      <p>A new order has been added from ${order_info.first_name + " " + order_info.last_name}</p>

      <table style="border-collapse:collapse;width:100%;border-top:1px solid #dddddd;border-left:1px solid #dddddd;margin-bottom:20px">
         <thead>
            <tr>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:left;padding:7px;color:#222222" colspan="2"> Order Information </td>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"> <b>Order number:</b> ${order_info.order_id}<br> 
                  <b>Order date:</b> ${new Date(order_info.createdAt).toLocaleDateString()}<br>
                  <b>Payment method:</b> ${payment_method.name}<br> 
                  <b>Shipping Method:</b> ${shipping_method.name}
               </td>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"> <b>E-mail:</b> <a href=${`mailto:${order_info.email}`} target="_blank">${order_info.email}</a><br> 
                  <b>Contact number:</b> ${order_info.telephone}<br> 
                  <b>IP address:</b> ${order_info.ip == "::1" ? "127.0.0.1" : order_info.ip}<br> 
                  <b>Order Status:</b> ${order_status.name} <br>
               </td>
            </tr>
         </tbody>
      </table>
      <table style="border-collapse:collapse;width:100%;border-top:1px solid #dddddd;border-left:1px solid #dddddd;margin-bottom:20px;"> 
         <thead>
            <tr>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> Product </td>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> Quantity </td>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> Price </td>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> Tax </td>
               <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> Total </td>
            </tr>
         </thead>
         <tbody>
            ${order_products.map(order_product => (
               `<tr>
                  <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> ${order_product.name} </td>
                  <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> ${order_product.quantity} </td>
                  <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> $${order_product.price} </td>
                  <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> $${order_product.tax} </td>
                  <td style="font-size:13px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222"> $${order_product.total} </td>
               </tr>`
            ))}
            <tr>
               <td colspan="4" style="text-align:left;padding-left:10px;">
                  Total Price
               </td>
               <td style="text-align:center;">
                  $${order_products.reduce((total,product) => parseFloat(product.price) * parseFloat(product.quantity) + total ,0)}
               </td>
            </tr>
            <tr>
               <td colspan="4" style="text-align:left;padding-left:10px;">
                  Total Tax
               </td>
               <td style="text-align:center;">
                  $${order_products.reduce((total,product) => parseFloat(product.tax) * parseFloat(product.quantity) + total ,0)}
               </td>
            </tr>
            <tr>
               <td colspan="4" style="text-align:left;padding-left:10px;">
                  Total Price & Tax
               </td>
               <td style="text-align:center;">
                  $${order_products.reduce((total,product) => (parseFloat(product.price) + parseFloat(product.tax)) * parseFloat(product.quantity) + total ,0)}
               </td>
            </tr>
         </tbody>
      </table>
   </div>
   `

   const mailOptionsReceive = getMailOptionsReceive(order_info.first_name + " " + order_info.last_name, order_info.email, `New Order From ${order_info.first_name + " " + order_info.last_name}`, htmlEmailReceiveFormat)
   const mailOptionsSend = getMailOptionsSend(order_info.email, `${process.env.STORE_NAME} - Order Confirmation ${order_info.order_id}`, htmlEmailSendFormat)

   transporter.sendMail(mailOptionsSend).then(response => {
      console.log(response)
   
   })

   transporter.sendMail(mailOptionsReceive).then(response => {
      console.log(response)
   })
   
}

module.exports= {addOrderGET, addOrderPOST};