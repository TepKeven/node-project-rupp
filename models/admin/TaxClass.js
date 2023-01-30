const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");
const Product = require('./Product');

const TaxClass = database.define("tax_class", {
    
    tax_class_id: {
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
    description: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false
    },
    rate: {
        type: DataTypes.DECIMAL(15,4),
        defaultValue: 0,
        allowNull: false
    },
    type: {
        type: DataTypes.CHAR(1),
        defaultValue: "P",  // P = Percent Discount; F = Fixed Discount
        allowNull: false
    }
 });
 
 module.exports = TaxClass;