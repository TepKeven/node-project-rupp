const Product = require("../../models/admin/Product")
const {productDescriptionAssoc, orderProductAssoc} = require("./mainController")
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

// get
const getOrders = async (req,res,next) => {

   var start  = parseInt((req.query.start == undefined || parseInt(req.query.start) < 1) ? 1 : req.query.start);
   var end = parseInt((req.query.end == 0 || req.query.end == null || parseInt(req.query.end) < parseInt(req.query.start)) ? 0 : req.query.end)
   

   const orders = await Order.findAll({
      include: [orderProductAssoc],
   })

   const order_statuses = await OrderStatus.findAll();

   res.status(200).json({
      order_statuses: order_statuses,
      orders: orders.filter((order,index) => {
         return ((end == 0) ? true : (index >= start - 1 && index <= end - 1 )) // return all or just between certain index
      }),
      length: orders.length
   })
}

// get order by id
const getOrderById = async  (req,res,next) => {

   var order_id = req.params.order_id
   const customers = await Customer.findAll();
   const customer_groups  = await CustomerGroup.findAll();
   const currencies = await Currency.findAll();
   
   const products = await Product.findAll({
      include: [productDescriptionAssoc],
   });
   
   const countries = await Country.findAll();
   const payment = await Payment.findAll();
   const shipment = await Shipment.findAll();
   const order_status = await OrderStatus.findAll();
   const tax_classes = await TaxClass.findAll();

   const order = await Order.findByPk(order_id)

   const order_products = await OrderProduct.findAll({
      where: {
         order_id: order_id
      }
   })

   res.status(200).json({
      order: order,
      order_products: order_products,
      customers: customers,
      customer_groups: customer_groups,
      currencies: currencies,
      products: products,
      countries: countries,
      payment: payment,
      shipment: shipment,
      order_status: order_status,
      tax_classes: tax_classes
   })
}


// Add GET Request 
const addOrderGET = async (req,res,next) => {

   const customers = await Customer.findAll();
   const customer_groups  = await CustomerGroup.findAll();
   const currencies = await Currency.findAll();
   
   const products = await Product.findAll({
      include: [productDescriptionAssoc],
   });
   
   const countries = await Country.findAll();
   const payment = await Payment.findAll();
   const shipment = await Shipment.findAll();
   const order_status = await OrderStatus.findAll();
   const tax_classes = await TaxClass.findAll();

   res.status(200).json({
      customers: customers,
      customer_groups: customer_groups,
      currencies: currencies,
      products: products,
      countries: countries,
      payment: payment,
      shipment: shipment,
      order_status: order_status,
      tax_classes: tax_classes
   })
}



// Add POST Request
const addOrderPOST = async (req,res,next) => {

   var request = req.body
   var orderProducts = JSON.parse(request.orderProducts)
   const countries = await Country.findAll();
   var order_product_list = []

   const total_price_tax = orderProducts.reduce((total,product) => (parseFloat(product.price) + parseFloat(product.tax)) * parseFloat(product.quantity) + total ,0)

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

   orderProducts.map(orderProduct => {

      var order_product = {
         order_id: order.order_id,
         product_id: orderProduct.product_id,
         name: orderProduct.name,
         model: orderProduct.model,
         quantity: orderProduct.quantity,
         price: orderProduct.price,
         total: (parseFloat(orderProduct.price) + parseFloat(orderProduct.tax)) * parseFloat(orderProduct.quantity),
         tax: orderProduct.tax
      }

      order_product_list.push(order_product)
   })

   const order_products = await OrderProduct.bulkCreate(order_product_list)

   res.status(200).json({
      status: "Success", 
      message: "Order Created Successfully",
      order: order,
      order_products: order_products
   })
   
}

// Edit Order
const editOrderPOST = async (req,res,next) => {

   // Update Order
   var order_id = req.params.order_id;
   var order = await Order.findByPk(order_id)

   var request = req.body
   var orderProducts = JSON.parse(request.orderProducts)
   const countries = await Country.findAll();
   var order_product_list = []
   var order_products = [];

   const total_price_tax = orderProducts.reduce((total,product) => (parseFloat(product.price) + parseFloat(product.tax)) * parseFloat(product.quantity) + total ,0)

   var updated_order = {
      invoice_prefix: order.invoice_prefix,
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
   }

   order = Object.assign(order,updated_order);
   await order.save();

   const affected_rows = await OrderProduct.destroy({
      where: {
         order_id: order_id
      }
   })

   if(orderProducts.length > 0){

      orderProducts.map(orderProduct => {

         var order_product = {
            order_id: order_id,
            product_id: orderProduct.product_id,
            name: orderProduct.name,
            model: orderProduct.model,
            quantity: orderProduct.quantity,
            price: orderProduct.price,
            total: (parseFloat(orderProduct.price) + parseFloat(orderProduct.tax)) * parseFloat(orderProduct.quantity),
            tax: orderProduct.tax
         }

         order_product_list.push(order_product)
      })

      order_products = await OrderProduct.bulkCreate(order_product_list)
   }

   res.status(200).json({"status": "success", "message": `${order.invoice_prefix} Updated Succesfully.`, order: order, order_products: order_products})   
   
}

// Delete Orders
const deleteOrders = async (req,res,next) => {

   var request = req.body;

   const affected_rows = await OrderProduct.destroy({
      where: {
         order_id: request.order_ids
      }
   }).then(async (rows) => {

      return await Order.destroy({
         where: {
            order_id: request.order_ids
         },
      })
   })

   res.status(200).json({
      "status": "success", "message": `Orders Deleted Succesfully.`, "affected_rows": affected_rows
   })
}

module.exports= {getOrders,addOrderGET,addOrderPOST, getOrderById, editOrderPOST, deleteOrders};