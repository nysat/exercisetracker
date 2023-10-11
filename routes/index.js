const router = require('express').Router();
const apiRoutes = require('./api');// you can see that im importing the api folder here

//might need to add a home route here to render the home page
// consthomeRoutes = require('./homeRoutes.js'); this will stay commented out until we have a home page to render
// router.use('/', homeRoutes);

router.use('/api', apiRoutes);// this is saying that if we go to /api then use the api routes






module.exports = router;// this is exporting the router a necessary step to make sure the routes work