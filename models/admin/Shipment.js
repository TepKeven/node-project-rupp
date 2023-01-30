const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");


const Shipment = database.define("shipment", {
    
    shipping_id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
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

 
 module.exports = Shipment;