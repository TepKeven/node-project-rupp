const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const Currency = database.define("currency", {
    
    currency_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    symbol_left: {
        type: DataTypes.STRING,
        allowNull: true
    },
    symbol_right: {
        type: DataTypes.STRING,
        allowNull: true
    },
    decimal_place: {
        type: DataTypes.CHAR(1),
        defaultValue: 2,
        allowNull: false
    },
    value_from_usd: {
        type: DataTypes.DOUBLE(15,8),
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
 
 module.exports = Currency;