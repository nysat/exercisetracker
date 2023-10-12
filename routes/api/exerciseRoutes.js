const router = require('express').Router();
const { Exercise } = require('../../models/Exercise');

router.get('/', async (req, res) => {
    Exercise.findAll().then((exerciseData) => {
        res.json(exerciseData);
    }
    ).catch((err) => {
        res.json(err);
    }); 
});

router.put('/:id', async (req, res) => {
    Exercise.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(updatedExercise => {
        res.json(updatedExercise)}
        )
});
module.exports = router;