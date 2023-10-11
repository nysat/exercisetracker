require('dotenv').config();
const Sequelize = require('sequelize');
const URI = process.env.MYSQL_URI
const sequelize = new Sequelize(URI);
module.exports = sequelize;