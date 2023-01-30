const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");
const Customer = require('./Customer');

const Address = database.define("address", {
    
    address_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    customer_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        references: {
            model: Customer,
            key: "customer_id"
        }
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
        type: DataTypes.STRING,
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
    postcode: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    country_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    }
 });
 
 module.exports = Address;