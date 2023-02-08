const express = require("express");
const SlideshowController = require('../controllers/front/SlideshowController')
const ProductController = require("../controllers/front/productController")
const OrderController = require("../controllers/front/OrderController")
// const CategoryController = require("../controllers/front/CategoryController")
const FrontAuth = require("../middleware/front/Auth");
const routerFront = express.Router();

// Slideshow
routerFront.get("/slideshow",SlideshowController.getSlideshows);

// Products
routerFront.get("/product", ProductController.getProducts); 
routerFront.get("/product/:product_id", ProductController.getProductById);

// Orders
routerFront.get("/order", OrderController.addOrderGET); 
routerFront.get("/order", OrderController.addOrderPOST);

// Middleware
// routerFront.use(FrontAuth.checkAuthValidCustomer)

// Checkout


module.exports= routerFront;