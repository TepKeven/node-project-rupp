const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");
const OrderStatus = require('./OrderStatus');

const Setting = database.define("setting", {
    
    setting_id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    meta_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    meta_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    meta_keyword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    store_name: {
        type: DataTypes.STRING(100),
        defaultValue: process.env.STORE_NAME,
        allowNull: false
    },
    store_owner: {
        type: DataTypes.STRING(100),
        defaultValue: process.env.STORE_NAME,
        allowNull: false
    },
    store_address: {
        type: DataTypes.STRING,
        defaultValue: process.env.STORE_NAME,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(96),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    telephone: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    fax: {
        type: DataTypes.STRING(32),
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    order_status_id: {
        type: DataTypes.INTEGER(11),
        defaultValue: 1,
        allowNull: false,
        references: {
            model: OrderStatus,
            key: "order_status_id"
        }
    },
    store_logo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    store_icon: {
        type: DataTypes.STRING,
        allowNull: true
    },
 });
 
 module.exports = Setting;