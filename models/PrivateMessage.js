const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PrivateMessageSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'chat-rooms'
    },
    message: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    isRead: {
        type: Boolean,
        required: false
    },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = PMessage = mongoose.model('privateMessage', PrivateMessageSchema);
