const { Sequelize } = require('sequelize');
require('dotenv').config();

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME,process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DRIVER,
    port: process.env.DB_PORT,
    define: {
        freezeTableName: true
    }
});

module.exports = database;

