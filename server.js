require('dotenv').config(); // import dotenv package
const express = require('express'); // import express]
const exhbs = require('express-handlebars'); // import handlebars
const session = require('express-session'); // import express-session
const path = require('path');
const withAuth = require('./utils/auth'); // import auth middleware
const helpers = require('./utils/helpers'); // import helpers

//Import Models to sync them with the database
// const {User} = require('./models'); 
// const {Exercise} = require('./models'); //ylcbranch

// create express app  
const app = express();   
const PORT = process.env.PORT || 3001; // set port to what we have in the .env file or 3001

const sequelize = require('./config/connection');//Import connection object for sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store); // import sequelize store

//set up sessions
const sess = {
    secret: process.env.SECRET,
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      },
      resave: false,
      saveUninitialized: true,
      store: new SequelizeStore({
        db: sequelize
      })
}

app.use(session(sess));
const hbs = exhbs.create({helpers});

//define these prior to middleware
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars'); 

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//this is to serve static files like css and js files//this is only
//going to work if we have apublic folder in the root directory with the css files we need which we should do to maintain the mvc structure



// app.use(withAuth); // use auth middleware
app.use(require('./controllers')); // import routes


// create connection to database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});//the force: false means that we dont want to drop the tables and re-create them if they already exist