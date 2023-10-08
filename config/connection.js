require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = process.env.MYSQL_URI
    ? new Sequelize(process.env.MYSQL_URI)
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            port: 3306
        }
        );
    
module.exports = sequelize;