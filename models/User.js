const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
//remember that "model" and "datatypes" are from sequelize its a package that sequelize lets usq use
class User extends Model {
    checkPassword(loginPw) { //loginPw is the password that the user enters the plain text 
        return bcrypt.compareSync(loginPw, this.password); //this.password is the hashed password in the database
    } //bcrypt.compareSync is a method that compares the plain text password to the hashed password in the database
    //this is getting invoked in the routes/api/userRoutes.js file line 30 
}

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull:true,     //remember to change this to false this is just for testing
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true, //remember to change this to false this is just for testing
        validate: {
            len: [8],
        },
    },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => { //this is to hash the password before it is created
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData
            },
            beforeUpdate: async (updatedUserData) => { //this is to hash the password before it is updated
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData
            },//theses hooks are taking the password and hashing it before it is created or updated literally right before the code hits 
            //the .create or .update methods in the roues/api/userRoutes.js file
        },
        sequelize,
        timestamps: false, //this is to prevent it from creating the createdAt and updatedAt columns (extra tables in the database)
        freezeTableName: true,
        underscored: true,
        modelName: 'user',  
});

module.exports = User;
// user needs to be able to tie exercises and dates to their client account
// basic information username/password
