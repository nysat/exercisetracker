const router = require('express').Router();
const { Exercise, User } = require('../../models');

//get all exercises
router.get('/', async (req, res) => {
    try {
        const exerciseData = await Exercise.findAll({
            include: [{ model: User }] //this is to include the user that created the exercise
        });
        res.status(200).json(exerciseData);
    } catch (err) {
        res.status(500).json(err);
    }
});
//get one exercise
router.get('/:id', async (req, res) => {
    try {
        const exerciseData = await Exercise.findByPk(req.params.id, {
            include: [{ model: User }] //this is to include the user that created the exercise
        });
        res.status(200).json(exerciseData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create new exercise
router.post('/', async (req,res)=>{
    try{
        const exerciseData = await Exercise.create({
            title: req.body.title,
            date: req.body.date,
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight,
            bodyweight: req.body.bodyweight,
            comments: req.body.comments,
            user_id: req.body.user_id //ylcbranch
        });
        res.status(200).json(exerciseData);
    }catch(err){
        res.status(400).json({err: err.message});
    }
})

//update exercise
router.put('/:id', async (req, res) => {
    try {
        const exerciseData = await Exercise.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(exerciseData);
    } catch (err) {
        res.status(500).json(err);
    }
});
//delete exercise
router.delete('/:id', async (req,res)=>{
    try {
    const deleteResult = await Exercise.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({message: 'exercise deleted',deleteResult})     
    } catch (err) {
        res.status(500).json(err);
        
    }
});
module.exports = router;