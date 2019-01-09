const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostInfoSchema = new Schema({
    postsInfo : [
        {
            count: {
                type: Number,
            },
            date: {
                type: Date,
                default: Date.now
            }
        },
    ]



});

module.exports = PostInfo = mongoose.model('admin-infos', PostInfoSchema);
