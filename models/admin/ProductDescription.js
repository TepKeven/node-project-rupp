const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const ProductDescription = database.define("product_description", {

    product_description_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    // product_id: {
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
    tag: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: false,
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
    
})

module.exports = ProductDescription;