const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.MYSQL_URI) {
  sequelize = new Sequelize(process.env.MYSQL_URI);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;