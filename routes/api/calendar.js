const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');

const CalendarEvent = require('../../models/CalendarEvent');


router.get('/', auth, async (req, res, next) => {
    try {
        const events = await CalendarEvent.find({user: req.user._id});
        res.json(events);
    } catch (err) {
        next(err)
    }
});

router.post('/', auth, (req, res, next) => {

    const { name, description, date } = req.body;

    const newEvent = new CalendarEvent({
        name,
        description,
        date,
        user: req.user._id
    });

    newEvent.save()
        .then(event => {
            res.json(event);

        })
        .catch(err => next(err));

});

module.exports = router;
