const express = require("express");
const routerAdmin = express.Router();
const multer = require("multer");
const path = require("path")
const CategoryController = require("../controllers/admin/CategoryController")
const ProductController = require("../controllers/admin/ProductController")

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


// Category
routerAdmin.get("/category",CategoryController.getCategories);
routerAdmin.post("/category/new", categoryMulter.single("category_image"), CategoryController.addCategory);
routerAdmin.get("/category/:category_id",CategoryController.getCategoryById)
routerAdmin.post("/category/edit/:category_id", categoryMulter.single("category_image") , CategoryController.editCategory)
routerAdmin.post("/category/delete", CategoryController.deleteCategories)

// Product
routerAdmin.get("/product",ProductController.getProducts);

module.exports=routerAdmin;