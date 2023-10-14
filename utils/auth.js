//add withAuth to the routes that we want to protect
const withAuth = (req, res, next) => {// If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  //this is middleware so this is a point that your code goes through before it gets to the routes and since we have this here 
  //its to verify that the user is logged in and has a session before anything else
 
  module.exports = withAuth;
