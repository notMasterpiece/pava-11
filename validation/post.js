const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    //Validation
    if (!Validator.isLength((data.text), {min: 10, max: 3000})) {
        errors.text = 'Text needs to be beetwen 10 and 3000 characters';
    }


    if (Validator.isEmpty(data.text)) {
        errors.text = 'text field is required';
    }




    return {
        errors,
        isValid: isEmpty(errors)
    };
};