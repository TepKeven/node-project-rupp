const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const Country = database.define("country", {
    
    country_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    iso_code_2: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    iso_code_3: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    postcode_required: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
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
 
 module.exports = Country;