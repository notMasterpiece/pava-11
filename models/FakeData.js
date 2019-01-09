const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FakeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});


module.exports = Fake = mongoose.model('faker', FakeSchema);





