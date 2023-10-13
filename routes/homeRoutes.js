const router = require('express').Router();
const { User, Exercise } = require('../models');

//this is where we will have the login page     
router.get('/', (req, res) => {
    res.render('home');
});
//serialize data for handlebars so it can read it 

//pass serialized data into a template

//we can add a .get route to get all the exercises for a user and render them on the page

//if  the user is already logged in we can redirect them to the home page or direct them to a different route 

