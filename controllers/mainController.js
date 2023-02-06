const Category = require("../models/admin/Category");
const CategoryDescription = require("../models/admin/CategoryDescription");
const Manufacturer = require("../models/admin/Manufacturer");
const Order = require("../models/admin/Order");
const OrderProduct = require("../models/admin/OrderProduct");
const Product = require("../models/admin/Product");
const ProductDescription = require("../models/admin/ProductDescription");
const StockStatus = require("../models/admin/StockStatus");
const TaxClass = require("../models/admin/TaxClass");

// Category has many CategoryDescription 
const categoryDescriptionAssoc = Category.hasMany(CategoryDescription, {
    foreignKey: {
      name: "category_id"
    },
    as: "category_description_assoc",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })

// Product has many ProductDescription 
const productDescriptionAssoc = Product.hasMany(ProductDescription,{
  foreignKey: {
    name: "product_id"
  },
  as: "product_description_assoc",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

// Order has many OrderProduct
const orderProductAssoc = Order.hasMany(OrderProduct,{
  foreignKey: {
    name: "order_id"
  },
  as: "order_product_assoc",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
  
module.exports = {categoryDescriptionAssoc, productDescriptionAssoc, orderProductAssoc}