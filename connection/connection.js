const Sequelize = require('sequelize');
const URI = process.env.MYSQLURI
const sequelize = new Sequelize(URI);
module.exports = sequelize;