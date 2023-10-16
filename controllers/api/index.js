//there has to be an index.js file in the api folder to export the whole folders routes
const router = require('express').Router();

router.use('/users', require('./userRoutes.js'));
router.use('/exercises', require('./exerciseRoutes.js'));

module.exports = router;