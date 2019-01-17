const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCreatePost(data) {

    let errors = {};

    if (!Validator.isLength((data.title), {min: 10, max: 40})) {
        errors.title = 'title must be 10-40 characters';
    }
    if (!Validator.isLength((data.short_description), {min: 10, max: 40})) {
        errors.short_description = 'short_description must be 10-40';
    }

    if (Validator.isEmpty((data.full_description), {min: 10, max: 40})) {
        errors.full_description = 'full_description must be not empty';
    }

    if (Validator.isEmpty(data.tags)) {
        errors.tags = 'Tags is required';
    }

    if(!isEmpty(data.source_link)) {
        if(!Validator.isURL(data.source_link)) {
            errors.source_link = ' no Valid URL'
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};