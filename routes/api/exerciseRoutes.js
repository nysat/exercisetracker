const router = require('express').Router();
const { Exercise } = require('../../models/Exercise');

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