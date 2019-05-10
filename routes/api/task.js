const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');

const Task = require('../../models/Task');


router.get('/', auth, (req, res, next) => {

    Task.find({user: req.user.id})
        .then(tasks => {
            res.json(tasks);
        })

});

router.post('/', auth, (req, res, next) => {

    const newTask = new Task({
        text: req.body.task,
        user: req.user.id
    });

    newTask.save()
        .then(task => {
            res.json(task);

        })
        .catch(err => {
            console.log(err);
        })

});

module.exports = router;
