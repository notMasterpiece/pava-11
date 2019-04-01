const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ImageSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    format: {
        type: String,
    },
    size: {
        type: String,
    },
    width: {
        type: String,
    },
    height: {
        type: String,
    }
}, {timestamps: true});

module.exports = Task = mongoose.model('Photo', ImageSchema);
