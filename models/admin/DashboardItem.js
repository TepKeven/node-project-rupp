const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const DashboardItem = database.define("dashboard_item", {
    
    dashboard_item_id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    href: {
        type: DataTypes.STRING,
        defaultValue: "#",
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        defaultValue: "fas fa-pen",
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
 
 module.exports = DashboardItem;