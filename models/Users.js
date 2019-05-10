const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
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
        default: 'http://www.gravatar.com/avatar/e88f429b969571eefabad6f357289dba?s=250&r=pg&d=mm'
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
}, {
    versionKey: false,
    timestamps: true
});


module.exports = User = mongoose.model('users', UserSchema);





