const User = require('./User');
const Exercise = require('./Exercise');

User.hasMany(Exercise, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' //this means if a user is deleted, all of their exercises will be deleted as well
});

Exercise.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Exercise };
// create relationships between the tables
// foreign key and primary key connections
// userid will be on every exercise
// write exercise belongs to (user)
// key relationship
// pull all exercises attached to a user
// depending on how we want data displayed, there may be need to create a function to change order of display