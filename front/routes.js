const express = require("express");
const Slideshow = require('../front/controller/slideshow')
const Product = require("../front/controller/product")
const Order = require("../front/controller/order")
const routerFront = express.Router();


// Slideshow
routerFront.get("/slideshow",Slideshow.getAll);

// Products
routerFront.get("/product", Product.getAll); 
routerFront.get("/product/:id", Product.getById);

// Orders
routerFront.get("/order", Order.getAll); 
routerFront.get("/order/:id", Order.getById);

module.exports=routerFront;