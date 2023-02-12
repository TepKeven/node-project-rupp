const express = require("express");
const SlideshowController = require('../controllers/front/SlideshowController')
const ProductController = require("../controllers/front/productController")
const OrderController = require("../controllers/front/OrderController")
const CartController = require("../controllers/front/CartController")
const StoreController = require("../controllers/front/StoreController")
const HomeController = require("../controllers/front/HomeController")
const ContactController = require("../controllers/front/ContactController")
const AuthController = require("../controllers/front/AuthController")
const FrontAuth = require("../middleware/front/Auth");
const multer = require("multer");
const routerFront = express.Router();
const path = require("path")

const getMulterStorage = (destination_dir) => {

    var storage = multer.diskStorage({

      destination: function (req, file, cb) {
        cb(null, destination_dir)
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
      }
    })

    return storage;
}

var cartMulter = multer(
  {storage: getMulterStorage("./assets/images/cart")}
);

var orderMulter = multer({
  storage: getMulterStorage("./assets/images/order")
})

var contactMulter = multer()

var customerMulter = multer({
  storage: getMulterStorage("./assets/images/customer")
})

routerFront.get("/home", HomeController.getHomeItems)

// Slideshow
routerFront.get("/slideshow",SlideshowController.getSlideshows);

// Products
routerFront.get("/product", ProductController.getProducts); 
routerFront.get("/product/:product_id", ProductController.getProductById);

// Orders
routerFront.post("/order/new/get", orderMulter.single("order_image"), OrderController.addOrderGET); 
routerFront.post("/order/new", orderMulter.single("order_image"), OrderController.addOrderPOST);

// Cart
routerFront.post("/cart", cartMulter.single("cart_image"), CartController.getCarts)

// Store
routerFront.get("/store", StoreController.getStoreItems)

// Contact
routerFront.post("/contact", contactMulter.none(), ContactController.sendMailAdmin)

// Login
routerFront.post("/login", customerMulter.single("customer_image"), AuthController.customerLogin)

// Register
routerFront.get("/register",AuthController.customerRegisterGET);
routerFront.post("/register", customerMulter.single("customer_image"), AuthController.customerRegisterPOST)

// Middleware
// routerFront.use(FrontAuth.checkAuthValidCustomer)

// Checkout


module.exports= routerFront;