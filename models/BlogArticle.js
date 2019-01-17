const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BlogArticle = new Schema({
    title: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    full_description: {
        type: String
    },
    author: {
        type: String
    },
    author_detailed: {
        type: String
    },
    category: {
        type: String
    },
    comments_count: {
        type: String
    },
    views_count: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    likes_count: {
        type: String,
    },
    source_link: {
        type: String,
    },
    tags: {
        type: [String]
    },
    reading_time: {
        type: String,
    },
    reading_time_word: {
        type: String
    },
    status: {
        type: String,
        default: 'created'
    },
    full_page_image: {
        type: String
    }

});

module.exports = Blog = mongoose.model('blogs', BlogArticle);