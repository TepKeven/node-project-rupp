const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const UserRole = database.define("user_roles", {
    
    user_role_id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    permission: {
        type: DataTypes.TEXT,
        defaultValue: "",
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
 
 module.exports = UserRole;