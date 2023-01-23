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

database
  .drop()
  .then((result) => {
    console.log("Drop Success", result);
  })
  .catch((err) => {
    console.log(err);
  });
