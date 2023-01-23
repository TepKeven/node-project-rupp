const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const Customer = database.define("customers", {
    
    customer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    // customer_group_id:{
    //     type: DataTypes.INTEGER,
    //     defaultValue: 1,
    //     allowNull: false
    // },
    store_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    language_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
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
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING(10),
        defaultValue: "12345", // hash(password + salt)
        allowNull: false
    },
    cart: {
        type: DataTypes.STRING,
        allowNull: true
    },
    wishlist: {
        type: DataTypes.STRING,
        allowNull: true
    },
    newsletter: {
        type: DataTypes.INTEGER(1),
        defaultValue: 1,
        allowNull: false
    },
    address_id: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING(100),
        validate: {
            isIP: true
        },
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER(1),
        defaultValue: 1,
        allowNull: false
    }
 });
 
 module.exports = Customer;