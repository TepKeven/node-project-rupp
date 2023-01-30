const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const ProductToCategory = database.define("product_to_category", {

    product_to_category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
})

module.exports = ProductToCategory;