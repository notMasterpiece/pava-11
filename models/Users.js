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
    online: {
        type: Boolean,
        default: false
    },
    password: {
        type: String
    },
    avatar: {
        type: String,
        default: 'https://www.growthengineering.co.uk/wp-content/uploads/2014/05/Interaction-design-user-experience.png'
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





