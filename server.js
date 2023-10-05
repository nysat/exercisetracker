const express = require('express'); // import express
const mysql = require('mysql'); // import mysql  ////this is supposed to say 'mysql2'

const app = express();  // create express app   

//Import connection object for sequelize
const sequelize = require('./config/connection');

// create connection to database
const connection = mysql.createConnection({
    
});