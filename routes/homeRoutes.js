const router = require('express').Router();
const { User, Exercise } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async(req,res)=>{
  res.render('login');
})


//this is where we will have the home page once a user is logged in 
router.get('/home', /*withAuth,*/ async(req,res)=>{
  try {
    const userData = await Exercise.findAll({
      include: [{model: User}]
    });
    const exercises = userData.map((exercise) => exercise.get({ plain: true }));//this is returning an array of plain json objects for each exercise
    res.render('home', { exercises });
  } catch (err) {
    res.status(500).json(err);
    }                       
  });



//login route 
router.get('/login', (req, res) => {
  if (req.session.logged_in) { //if user is logged in then redirect to the newWorkout page from handlebars
    res.redirect('/newWorkout');
    return;
}
res.render('login'); //otherwise render the login page
});

router.get('/public/js/login.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  // Your code to send the JavaScript file
});

module.exports = router;
