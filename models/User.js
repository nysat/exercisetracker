const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//remember to require bcrypt
//remember that "model" and "datatypes" are from sequelize its a package that sequelize lets usq use
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
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
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData
            },
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
