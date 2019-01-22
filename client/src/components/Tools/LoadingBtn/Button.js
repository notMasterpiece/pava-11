import React from 'react';
import PropTypes from 'prop-types';

const Button = ({text, onClick, loadingBtn}) => {
    return (
        <button
            className={`btn btn-primary ${loadingBtn ? 'btn-loading' : ''}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

Button.defaultProps = {
    loadingBtn: false
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    loadingBtn: PropTypes.bool,
};

export default Button;