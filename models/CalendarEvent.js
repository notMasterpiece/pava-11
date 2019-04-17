const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarEvent = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
        date: {
        type: String,
        required: true
    }
}, {timestamps: true} );



CalendarEvent.pre('save', next => {
    console.log('pre save callback');
    next();
});

CalendarEvent.post('save', (event, next) => {
    console.log(event, 'this is an event');
    next();
});




module.exports = Task = mongoose.model('Calendar-Event', CalendarEvent);
