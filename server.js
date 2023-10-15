require('dotenv').config(); // import dotenv package
const express = require('express'); // import express]
const exhbs = require('express-handlebars'); // import handlebars
const Sequelize = require('sequelize'); // import sequelize package
const hbs = exhbs.create({});
const sequelize = require('./config/connection');//Import connection object for sequelize
const path = require('path');
const session = require('express-session'); // import express-session
const withAuth = require('./utils/auth'); // import auth middleware

//Import Models to sync them with the database
const {User} = require('./models'); 
const {Exercise} = require('./models'); //ylcbranch

// create express app  
const app = express();   
const PORT = process.env.PORT || 3001; // set port to what we have in the .env file or 3001

//set up sessions
const sess = {
    secret: process.env.SECRET,
    resave: false, 
    saveUnitialized: false,
}

app.use(session(sess));

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars'); 
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));//this is to serve static files like css and js files//this is only
//going to work if we have apublic folder in the root directory with the css files we need which we should do to maintain the mvc structure

app.use(withAuth); // use auth middleware
app.use(require('./routes')); // import routes

// create connection to database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});//the force: false means that we dont want to drop the tables and re-create them if they already exist