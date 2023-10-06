require('dotenv').config(); // import dotenv package
const express = require('express'); // import express
const sequelize = require('./config/connection');
const mysql = require('mysql'); // import mysql  ////this is supposed to say 'mysql2'


//Import Models to sync them with the database


const app = express();  // create express app   
const PORT = process.env.PORT || 3001; // set port to 3001//we still have to set this up in .env file 

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import connection object for sequelize
const sequelize = require('./config/connection');

// create connection to database
const connection = mysql.createConnection({
    
});