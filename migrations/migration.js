const database = require("../database");
const Customer = require("../models/admin/Customer");
const CustomerGroup = require("../models/admin/CustomerGroup")
const Order = require("../models/admin/Order");
const Slideshow = require("../models/admin/Slideshow")
const Product = require("../models/admin/Product")
const ProductDescription = require("../models/admin/ProductDescription")
const Category = require("../models/admin/Category")
const User = require("../models/admin/User")
const UserRole = require("../models/admin/UserRole");
const DashboardItem = require("../models/admin/DashboardItem");
const CategoryDescription = require("../models/admin/CategoryDescription");

Customer.hasMany(Order, {
  foreignKey: {
    name: "customer_id"
  }
});

// Order.belongsTo(Customer);


UserRole.hasMany(User,{
  foreignKey: {
    name: "user_role_id"
  }
})

// User.belongsTo(Userrole)


Category.hasMany(CategoryDescription, {
  foreignKey: {
    name: "category_id"
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

// Categorydescription.belongsTo(Category)

Product.hasMany(ProductDescription,{
  foreignKey: {
    name: "product_id"
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

// Productdescription.belongsTo(Product)

CustomerGroup.hasMany(Customer,{
  foreignKey: {
    name: "customer_group_id"
  }
})

// Customer.belongsTo(Customergroup)


database
  .sync()
  .then((result) => {
    console.log("success: ")
    console.log(result);
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
