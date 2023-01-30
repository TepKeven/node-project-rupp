const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");
const Product = require('./Product');

const Manufacturer = database.define("manufacturer", {
    
    manufacturer_id: {
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
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false    
    },
    
 });
 
 module.exports = Manufacturer;