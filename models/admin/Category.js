const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const Category = database.define("category", {
    
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    parent_id: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
        allowNull: false
    },
    top: {
        type: DataTypes.TINYINT(1),
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
    
 },{modelName: "category"});
 
 module.exports = Category;