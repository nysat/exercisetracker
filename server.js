require('dotenv').config(); // import dotenv package
const Sequelize = require('sequelize'); // import sequelize package
const express = require('express'); // import express
const sequelize = require('./config/connection');//Import connection object for sequelize
const routes = require('./routes'); // import routes
const mysql = require('mysql2'); // import mysql  ////this is supposed to say 'mysql2' but im not sure we need this here 

//Import Models to sync them with the database


const app = express();  // create express app   
const PORT = process.env.PORT || 3001; // set port to what we have in the .env file or 3001

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turn on routes
app.use(routes);

// create connection to database
// sync sequelize models to the database, then start the Express.js server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});


//the force: false means that we dont want to drop the tables and re-create them if they already exist