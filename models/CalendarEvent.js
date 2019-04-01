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
}, {timestamps: true});

module.exports = Task = mongoose.model('Calendar-Event', CalendarEvent);
