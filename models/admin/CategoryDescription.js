const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const CategoryDescription = database.define("category_description", {
    
    category_description_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    // category_id: {
    //     type: DataTypes.INTEGER(11),
    //     allowNull: false
    // },
    language_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
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
    }
    
 });
 
 module.exports = CategoryDescription;