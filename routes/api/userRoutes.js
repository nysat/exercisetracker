//we test these routes in postman like 
// http://localhost:3001/api/users you can see the path to test them in the folder structure 
//we are in routes/api/users.js and look at the link above..
const router = require('express').Router();
const {User} = require('../../models/User');

//this .post is to create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {email: req.body.email}});
        if (!userData) {
            res.status(400).json({message: 'Incorrect email or password, please try again'});
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({message: 'Incorrect email or password, please try again'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({user: userData, message: 'You are now logged in!'});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end(); //204 means that a request has succeeded, but client does not need to go to a different page
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;