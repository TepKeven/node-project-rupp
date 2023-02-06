const { Sequelize, DataTypes } = require('sequelize');
const database = require("../../database");

const Slideshow = database.define("slideshows", {
    
    slideshow_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    language_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    link: {
        type: DataTypes.STRING,
        // validate: {
        //     isUrl: true
        // }   
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sort_order: {
        type: DataTypes.INTEGER(6),
        allowNull: false
    },
    status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        allowNull: false
    }

 });
 
 module.exports = Slideshow;