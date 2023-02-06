const express = require("express");
const SlideshowController = require('../controllers/front/SlideshowController')
const ProductController = require("../controllers/front/productController")
const OrderController = require("../controllers/front/OrderController")
// const CategoryController = require("../controllers/front/CategoryController")
const routerFront = express.Router();


// Slideshow
// routerFront.get("/slideshow",SlideshowController.getSlideshows);

// Products
routerFront.get("/product", ProductController.getProducts); 
routerFront.get("/product/:product_id", ProductController.getProductById);

// Orders
// routerFront.get("/order", OrderController.getOrders); 
// routerFront.get("/order/:id", OrderController.getOrderById);

module.exports=routerFront;