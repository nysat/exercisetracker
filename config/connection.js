require('dotenv').config();
const Sequelize = require('sequelize');
const URI = new Sequelize(process.env.MYSQL_URI);









module.exports = sequelize;