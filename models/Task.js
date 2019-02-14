
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    progres: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

module.exports = Task = mongoose.model('Task', TaskSchema);
