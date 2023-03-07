const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const InformationDescription = database.define("information_description", {
    
    information_description_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
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
 
 module.exports = InformationDescription;