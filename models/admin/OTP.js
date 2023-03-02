const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");
const Country = require('./Country');
const Currency = require('./Currency');
const Customer = require('./Customer');
const OrderStatus = require('./OrderStatus');
const Payment = require('./Payment');
const Shipment = require('./Shipment');
require('dotenv').config();
const date = new Date();


const OTP = database.define("otp", {
    
    otp_id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(96),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    otp_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    expire: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('DATE_ADD(NOW(), INTERVAL 5 MINUTE)'),
        allowNull: false
    }
 });

 
 module.exports = OTP;