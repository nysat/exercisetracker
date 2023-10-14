const router = require('express').Router();
const { User, Exercise } = require('../models');
const withAuth = (`../utils/auth`);
<<<<<<< HEAD

router.get('/', async(req,res)=>{
  res.render('login');
})


//this is where we will have the home page once a user is logged in 
router.get('/home',withAuth, async(req,res)=>{
  try {
    const userData = await Exercise.findAll({
      include: [{model: User}]
    });
    const exercises = userData.map((exercise) => exercise.get({ plain: true }));
    res.render('homepage', { exercises });
  } catch (err) {
    res.status(500).json(err);
    }                       
=======
//this is where we will have the login page    
router.get('/', function (req, res) {
    res.render('newWorkout',);
>>>>>>> 35cb20f067eb8f6a809ef95687e5e19119deb220
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
