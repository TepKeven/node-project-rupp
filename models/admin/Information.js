const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const Information = database.define("information", {
    
    information_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bottom: {
        type: DataTypes.INTEGER(1),
        defaultValue: 0,
        allowNull: false
    },
    sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false    
    },
    status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        allowNull: false
    },
    
 });
 
 module.exports = Information;