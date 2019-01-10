const mongoose = require('mongoose');
const keys = require('../config/keys');

module.exports = () => {
    mongoose.connect( keys.mongoURI, { useNewUrlParser: true })
        .then( ()=> console.log('MongoDB connected') )
        .catch( err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
