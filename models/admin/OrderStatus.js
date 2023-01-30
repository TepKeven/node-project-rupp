const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");
require('dotenv').config();
const date = new Date();


const OrderStatus = database.define("order_status", {
    
    order_status_id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        allowNull: false
    },
    sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }

 });

 
 module.exports = OrderStatus;