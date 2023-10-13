const router = require('express').Router();
const Exercise = require('../../models/Exercise');

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

router.get('/', async (req, res) => {
    try {
        const exerciseData = await Exercise.findAll();
        res.status(200).json(exerciseData);
    } catch (err) {
        res.status(500).json(err);
    }
});

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
module.exports = router;