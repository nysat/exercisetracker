//remember this index page is setting the stage for all the routes and is being leveraged in the server.js file
const router = require('express').Router();
const apiRoutes = require('./api');// you can see that im importing the api folder here
const homeRoutes = require('./homeRoutes.js');// this is importing the home routes folder



router.use('/api', apiRoutes);// this is saying that if we go to /api then use the api routes
router.use('/', homeRoutes);//this is saying that if we go to / then use the home routes





module.exports = router;// this is exporting the router a necessary step to make sure the routes work