const express = require("express");
const routerAdmin = express.Router();
const multer = require("multer");
const path = require("path")
const CategoryController = require("../controllers/admin/CategoryController")
const ProductController = require("../controllers/admin/ProductController")
const OrderController = require("../controllers/admin/OrderController")
const CustomerController = require("../controllers/admin/CustomerController")
const UserController = require("../controllers/admin/UserController")
const SidebarController = require("../controllers/admin/SidebarController")
const UserRoleController = require("../controllers/admin/UserRoleController");
const AuthController = require("../controllers/admin/AuthController")
const SlideshowController = require("../controllers/admin/SlideshowController")
const DashboardController = require("../controllers/admin/DashboardController")
const NewsletterController = require("../controllers/admin/NewsletterController")
const AdminAuth = require("../middleware/admin/Auth");

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

var categoryMulter = multer(
  {storage: getMulterStorage("./assets/images/category")}
);

var productMulter = multer(
  {storage: getMulterStorage("./assets/images/product")}
)

var customerMulter = multer({
  storage: getMulterStorage("./assets/images/customer")
})

var orderMulter = multer({
  storage: getMulterStorage("./assets/images/order")
})

var userMulter = multer({
  storage: getMulterStorage("./assets/images/user")
})

var userRoleMulter = multer({
  storage: getMulterStorage("./assets/images/userrole")
})

var slideshowMulter = multer({
  storage: getMulterStorage("./assets/images/slideshow")
})

routerAdmin.post("/login", userMulter.single("user_image"), AuthController.userLogin)

// Middleware
routerAdmin.use(AdminAuth.checkAuthValidUser)

// Dashboard
routerAdmin.get("/dashboard", DashboardController.getDashboardData)

// Sidebar
routerAdmin.get("/sidebar", SidebarController.getSidebarItems)

// Category
routerAdmin.get("/category",CategoryController.getCategories);
routerAdmin.post("/category/new", categoryMulter.single("category_image"), CategoryController.addCategoryPOST);
routerAdmin.get("/category/edit/:category_id",CategoryController.getCategoryById)
routerAdmin.post("/category/edit/:category_id", categoryMulter.single("category_image") , CategoryController.editCategory)
routerAdmin.post("/category/delete", CategoryController.deleteCategories)

// Product
routerAdmin.get("/product",ProductController.getProducts);
routerAdmin.get("/product/new", ProductController.addProductGET)
routerAdmin.post("/product/new", productMulter.single("product_image"), ProductController.addProductPOST)
routerAdmin.get("/product/edit/:product_id", ProductController.getProductById)
routerAdmin.post("/product/edit/:product_id", productMulter.single("product_image"), ProductController.editProductPOST)
routerAdmin.post("/product/delete",  ProductController.deleteProducts)

// Order
routerAdmin.get("/order",OrderController.getOrders);
routerAdmin.get("/order/new",OrderController.addOrderGET);
routerAdmin.post("/order/new",orderMulter.single("order_image"), OrderController.addOrderPOST);
routerAdmin.get("/order/edit/:order_id", OrderController.getOrderById);
routerAdmin.post("/order/edit/:order_id",orderMulter.single("order_image"), OrderController.editOrderPOST);
routerAdmin.post("/order/delete",  OrderController.deleteOrders)

// Customer
routerAdmin.get("/customer",CustomerController.getCustomers)
routerAdmin.get("/customer/new",CustomerController.addCustomerGET)
routerAdmin.post("/customer/new",customerMulter.single("customer_image"), CustomerController.addCustomerPOST)
routerAdmin.get("/customer/edit/:customer_id", CustomerController.getCustomerById)
routerAdmin.post("/customer/edit/:customer_id", customerMulter.single("customer_image"), CustomerController.editCustomerPOST)
routerAdmin.post("/customer/delete",  CustomerController.deleteCustomers)

// User
routerAdmin.get("/user",UserController.getUsers)
routerAdmin.get("/user/new",UserController.addUserGET)
routerAdmin.post("/user/new",userMulter.single("user_image"), UserController.addUserPOST)
routerAdmin.get("/user/edit/:user_id",UserController.getUserById)
routerAdmin.post("/user/edit/:user_id",userMulter.single("user_image"), UserController.editUserPOST)
routerAdmin.post("/user/delete",  UserController.deleteUsers)


// User Roles 
routerAdmin.get("/userrole",UserRoleController.getUserRoles)
routerAdmin.get("/userrole/new",UserRoleController.addUserRoleGET)
routerAdmin.post("/userrole/new",userRoleMulter.single("user_role_image"), UserRoleController.addUserRolePOST)
routerAdmin.get("/userrole/edit/:user_role_id",UserRoleController.getUserRoleById)
routerAdmin.post("/userrole/edit/:user_role_id",userRoleMulter.single("user_role_image"), UserRoleController.editUserRolePOST)
routerAdmin.post("/userrole/delete",  UserRoleController.deleteUserRoles)

// Slideshow 
routerAdmin.get("/slideshow",SlideshowController.getSlideshows)
routerAdmin.get("/slideshow/new",SlideshowController.addSlideshowGET)
routerAdmin.post("/slideshow/new",slideshowMulter.single("slideshow_image"), SlideshowController.addSlideshowPOST)
routerAdmin.get("/slideshow/edit/:slideshow_id",SlideshowController.getSlideshowById)
routerAdmin.post("/slideshow/edit/:slideshow_id",slideshowMulter.single("slideshow_image"), SlideshowController.editSlideshowPOST)
routerAdmin.post("/slideshow/delete",  SlideshowController.deleteSlideshows)

// Newsletter 
routerAdmin.post("/newsletter/", NewsletterController.sendMailType)

module.exports=routerAdmin;