const express = require('express');
const router = express.Router();
const passport = require('passport');

const CalendarEvent = require('../../models/CalendarEvent');


router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    CalendarEvent
        .find({})
        .populate('user')
        .then(tasks => {
            res.json(tasks);
        })
        .catch(err => next(err));


});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    const { name, description, date } = req.body;

    const newEvent = new CalendarEvent({
        name,
        description,
        date,
        user: req.user.id
    });

    newEvent.save()
        .then(event => {
            res.json(event);

        })
        .catch(err => next(err));

});

module.exports = router;
