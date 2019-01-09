const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    },
    provider: {
        type: String
    },
    providerID: {
        type: String
    }
});


module.exports = User = mongoose.model('users', UserSchema);





