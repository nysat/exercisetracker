const router = require('express').Router();
const { User, Exercise } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async(req,res)=>{
  if (req.session.logged_in) { //if user is logged in then redirect to the home page from handlebars
    res.redirect('/home');
    return;
}
res.render('login'); //otherwise render the login page
})


//this is where we will have the home page once a user is logged in 
router.get('/home', withAuth, async(req,res)=>{
  try {
    const userData = await Exercise.findAll({
      include: [{model: User}]
    });
    const allExercises = userData.map((exercise) => exercise.get({ plain: true }));//this is returning an array of plain json objects for each exercise
    const exercises = allExercises.filter((exercise) => exercise.user_id === req.session.user_id);//this is filtering the array of exercises to only include the exercises that the user has created
    res.render('home', { exercises });
  } catch (err) {
    res.status(500).json(err);
    }                       
  });

  // create route for newWorkout
  router.get('/newWorkout', async(req,res)=>{
    res.render('newWorkout');
  })

module.exports = router;
