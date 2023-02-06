const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const Session = database.define("session", {
    
    session_id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    data: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_customer: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expire: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('DATE_ADD(NOW(), INTERVAL 2 hour)'),
        allowNull: false
    }
 });
 
 module.exports = Session;