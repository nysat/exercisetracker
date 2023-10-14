const router = require('express').Router();
const { User, Exercise } = require('../models');
const withAuth = (`../utils/auth`);

router.get('/', async(req,res)=>{
  res.render('login');
})


//this is where we will have the home page once a user is logged in 
router.get('/home',withAuth, async(req,res)=>{
  try {
    const userData = await Exercise.findAll({
      include: [{model: User}]
    });
    const exercises = userData.map((exercise) => exercise.get({ plain: true }));//this is returning an array of plain json objects for each exercise
    res.render('homepage', { exercises });
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










module.exports = router;
