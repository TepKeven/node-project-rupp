const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const User = database.define("users", {
    
    user_id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    // user_group_id:{
    //     type: DataTypes.INTEGER(11),
    //     defaultValue: 1,
    //     allowNull: false
    // },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(96),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(50),
        defaultValue: "",
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING(100),
        validate: {
            isIP: true
        },
        allowNull: false
    },
    status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        allowNull: false
    }
    
 });
 
 module.exports = User;