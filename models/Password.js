const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PasswordSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    site: {
        type: String
    },
    login: {
        type: String
    },
    pass: {
        type: String
    },
    other: {
        type: String
    }
});

module.exports = Password = mongoose.model('Password', PasswordSchema);
