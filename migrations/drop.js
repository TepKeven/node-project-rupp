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
const Manufacturer = require("../models/admin/Manufacturer");
const stockStatus = require("../models/admin/StockStatus");
const TaxClass = require("../models/admin/TaxClass");
const ProductToCategory = require("../models/admin/ProductToCategory")
const OrderProduct = require("../models/admin/OrderProduct")
const Address = require("../models/admin/Address");
const Currency = require("../models/admin/Currency")
const Country = require("../models/admin/Country")
const OrderStatus = require("../models/admin/OrderStatus")
const Payment = require("../models/admin/Payment")
const Shipment = require("../models/admin/Shipment")

database
  .drop()
  .then((result) => {
    console.log("Drop Success", result);
  })
  .catch((err) => {
    console.log(err);
  });
