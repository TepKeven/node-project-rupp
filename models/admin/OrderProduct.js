const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");
require('dotenv').config();
const date = new Date();


const OrderProduct = database.define("order_product", {
    
    order_product_id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    price: {
        type: DataTypes.DECIMAL(15,4),
        defaultValue: 0.00,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(15,4),
        defaultValue: 0.00,
        allowNull: false
    },
    tax: {
        type: DataTypes.DECIMAL(15,4),
        defaultValue: 0.00,
        allowNull: false
    }

 });

 
 module.exports = OrderProduct;