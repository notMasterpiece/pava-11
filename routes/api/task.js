const express = require('express');
const router = express.Router();
const passport = require('passport');

const Task = require('../../models/Task');


router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    Task.find({user: req.user.id})
        .then(tasks => {
            res.json(tasks);
        })

});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {

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
