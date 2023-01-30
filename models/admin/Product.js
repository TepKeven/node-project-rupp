const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");
const Manufacturer = require('./Manufacturer');
const StockStatus = require('./StockStatus');
const TaxClass = require('./TaxClass');

const Product = database.define("products", {

    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    model: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    stock_status_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: StockStatus,
            key: "stock_status_id"
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    manufacturer_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: Manufacturer,
            key: "manufacturer_id"
        }
    },
    price: {
        type: DataTypes.DECIMAL(15,4),
        defaultValue: 0.000,
        allowNull: false      
    },
    tax_class_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: TaxClass,
            key: "tax_class_id"
        }
    },
    subtract: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        allowNull: false
    },
    sort_order: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
        allowNull: false
    },
    status: {
        type: DataTypes.TINYINT(1),
        defaultValue:1,
        allowNull: false
    },
    viewed: {
        type: DataTypes.INTEGER(10),
        defaultValue: 0,
        allowNull: false
    }
    
});

module.exports =  Product;