const router = require('express').Router();
let Excercise = require('../models/excercise.model');

router.route('/').get((req, res) =>{
    Excercise.find()
    .then(excercises => res.json(excercises))
    .catch(err => res.status(400).json('Error message: '+err));
}); 

// Create a new excercise  
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExcercise = new Excercise({
        username,
        description,
        duration,
        date
    });

    newExcercise.save()
    .then(() =>{
        res.json('Excercise added successfully');
    })
    .catch(err => res.status(400).json('Err: '+err));
});
// Get excercise by Id
router.route('/:id').get((req, res) => {
    Excercise.findById(req.params.id)
    .then(excercise => res.json(excercise))
    .catch(err => res.status(400).json('Err: '+err));
});

// Delete excercise on basis of Id
router.route('/:id').delete((req, res) => {
    Excercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Excercise deleted successfuly!!!'))
    .catch(err => res.status(400).json('Err: '+err));
});

// Update an excercise based on its Id
router.route('/update/:id').post((req, res) => {
    Excercise.findById(req.params.id)
    .then(excercise => {
        excercise.username = req.body.username;
        excercise.description = req.body.description;
        excercise.duration = req.body.duration;
        excercise.date = req.body.date;

        excercise.save()
        .then(() => res.json('Excercise updated successfully'))
        .catch(err => res.status(400).json('Err: '+err));
    })
    .catch(err => res.status(400).json('Err: '+ err));
})

module.exports = router;