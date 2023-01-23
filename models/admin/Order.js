const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");
require('dotenv').config();
const date = new Date();


const Order = database.define("orders", {
    
    order_id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    invoice_no: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
        allowNull: false
    },
    invoice_prefix: {
        type: DataTypes.STRING(30),
        defaultValue: "INV-" + date.getFullYear() + "-00",
        allowNull: false
    },
    store_id: {
        type: DataTypes.INTEGER(11),
        defaultValue: 1,
        allowNull: false
    },
    store_name: {
        type: DataTypes.STRING(100),
        defaultValue: process.env.STORE_NAME,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    company: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    payment_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    shipping_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(15,4),
        defaultValue: 0,
        allowNull: false
    },
    order_status_id: {
        type: DataTypes.INTEGER(11),
        defaultValue: 1,
        allowNull: false
    },
    tracking: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false
    },
    language_id: {
        type: DataTypes.INTEGER(11),
        defaultValue: 1,
        allowNull: false
    },
    currency_id: {
        type: DataTypes.INTEGER(11),
        defaultValue: 1,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING(100),
        validate: {
            isIP: true
        },
        allowNull: false
    },
    payslip: {
        type: DataTypes.STRING(300),
        allowNull: true
    }

 });

 
 module.exports = Order;