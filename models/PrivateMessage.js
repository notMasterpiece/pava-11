const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PrivateMessageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    // receiver: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'users'
    // },
    isRead: {
        type: Boolean,
        required: false
    },
    populatedField: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        // The below option tells this plugin to always call `populate()` on
        // `populatedField`
        autopopulate: true
    }
}, {
    versionKey: false,
    timestamps: true
});

PrivateMessageSchema.plugin(require('mongoose-autopopulate'));
module.exports = PMessage = mongoose.model('privateMessage', PrivateMessageSchema);
