const router = require('express').Router();
const { User, Exercise } = require('../models');
const withAuth = (`../utils/auth`);
//this is where we will have the login page    
router.get('/', function (req, res) {
    res.render('newWorkout', {});
  });
//serialize data for handlebars so it can read it


//pass serialized data into a template


//we can add a .get route to get all the exercises for a user and render them on the page


//use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => { //you guys can change the /profile to whatever matches to the handlebars page that will have
//   //the logged in user's profile
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Exercise }],
//     });


//     const user = userData.get({ plain: true });


//     res.render('profile', {  //you probably need to change this to whatever the handlebars page is called
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }


//   res.render('login');
// });
module.exports = router;
