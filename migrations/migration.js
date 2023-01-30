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
const ProductToCategory = require("../models/admin/ProductToCategory");
const Manufacturer = require("../models/admin/Manufacturer");
const TaxClass = require("../models/admin/TaxClass");
const StockStatus = require("../models/admin/StockStatus");
const OrderProduct = require("../models/admin/OrderProduct");
const Address = require("../models/admin/Address");
const Currency = require("../models/admin/Currency")
const Country = require("../models/admin/Country")
const OrderStatus = require("../models/admin/OrderStatus")
const Payment = require("../models/admin/Payment")
const Shipment = require("../models/admin/Shipment")


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

Manufacturer.hasMany(Product, {
  foreignKey: {
    name: "manufacturer_id"
  },
})

StockStatus.hasMany(Product, {
  foreignKey: {
    name: "stock_status_id"
  },
})

TaxClass.hasMany(Product, {
  foreignKey: {
    name: "tax_class_id"
  },
})

// Productdescription.belongsTo(Product)

CustomerGroup.hasMany(Customer,{
  foreignKey: {
    name: "customer_group_id"
  },
})

// Customer.belongsTo(Customergroup)

Order.hasMany(OrderProduct, {
  foreignKey: {
    name: "order_id"
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

OrderStatus.hasMany(Order, {
  foreignKey: {
    name: "order_status_id"
  },
})

Customer.hasMany(Address, {
  foreignKey: {
    name: "customer_id"
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Country.hasMany(Order, {
  foreignKey: {
    name: "country_id"
  },
})

Currency.hasMany(Order, {
  foreignKey: {
    name: "currency_id"
  },
})

Payment.hasMany(Order,{
  foreignKey: {
    name: "payment_id"
  },
})

Shipment.hasMany(Order,{
  foreignKey: {
    name: "shipping_id"
  },
})

database
  .sync()
  .then((result) => {
    console.log("success: ")
    console.log(result);
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
