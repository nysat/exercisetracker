const express = require('express'); // import express]
const exhbs = require('express-handlebars'); // import handlebars
const mysql = require('mysql2'); // import mysql
require('dotenv').config(); // import dotenv package
const Sequelize = require('sequelize'); // import sequelize package
const hbs = exhbs.create();
const sequelize = require('./config/connection');//Import connection object for sequelize
const routes = require('./routes'); // import routes

//Import Models to sync them with the database
const {User} = require('./models'); 

const app = express();  // create express app   
const PORT = process.env.PORT || 3001; // set port to what we have in the .env file or 3001
//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars'); 
app.set('views', __dirname + '/views');

//turn on routes
app.use(routes);

app.use('/', (req, res) => {
    res.render('home');
});

// create connection to database
// sync sequelize models to the database, then start the Express.js server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});


//the force: false means that we dont want to drop the tables and re-create them if they already exist