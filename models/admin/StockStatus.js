const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");
const Product = require('./Product');

const StockStatus = database.define("stock_status", {
    
    stock_status_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Product,
            key: "product_id"
        }
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: "N/A",
        allowNull: false
    },
    
 });
 
 module.exports = StockStatus;