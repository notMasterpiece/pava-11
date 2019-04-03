const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatRoom = new Schema({
    date: {
        type: Date,
        default: new Date()
    },
    users: [{
        type: String
    }],
}, {
    versionKey: false,
    timestamps: true
});

module.exports = Chat = mongoose.model('chat-room', ChatRoom);