//we test these routes in postman like 
// http://localhost:3001/api/users you can see the path to test them in the folder structure 
//we are in routes/api/users.js and look at the link above..
const router = require('express').Router();
const { User, Exercise } = require('../../models');
const bcrypt = require('bcrypt');

//gets all users
router.get('/', async(req,res)=>{
    try{
        const userData = await User.findAll({
            include: [{model: Exercise}] //this is to include the exercises that the user has created
        });
        res.status(200).json(userData);
    } catch(err){
        res.status(500).json({err: err.message});
    }
});

//gets one user
router.get('/:id', async(req,res)=>{
    try{
        const userData = await User.findByPk(req.params.id, {
            include: [{model: Exercise}] //this is to tie in the exercises that the user has created
        });
        if(!userData){
            res.status(404).json({message: 'No user found with this id!'});
            return;
        }
        res.status(200).json(userData);
    } catch(err){
        res.status(500).json(err);
    }
})


//this .post is to create a new user
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password //ylcbranch
        });
        req.session.save(() => {
            req.session.user_id = userData.user_id;
            req.session.logged_in = true;
            res.json(userData);
        })
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {email: req.body.email}}); //searches database for email that matches the user logging in 
        if (!userData) { //if the email does not exist in the database it will return this message
            res.status(404).json({message: 'Incorrect email, please try again'});
            return;
        }
        //if user exists in the database then it will check the password
        const validPassword = await userData.checkPassword(req.body.password); //this is taking from the instance method in the user model
        if (!validPassword) { //if the password is incorrect it will return this message
            res.status(400).json({message: 'Incorrect password, please try again'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.user_id;
            req.session.logged_in = true;
            res.json({user: userData, message: 'You are logged in!'});
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
//deletes user
router.delete('/:id', async (req,res)=>{
    try {
    const deleteResult = await User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({message: 'User was deleted',deleteResult})     
    } catch (err) {
        res.status(500).json(err);
        
    }
});

module.exports = router;