const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//remember to require bcrypt
//remember that "model" and "datatypes" are from sequelize its a package that sequelize lets usq use
class User extends Model {

}



// user needs to be able to tie exercises and dates to their client account
// basic information username/password
