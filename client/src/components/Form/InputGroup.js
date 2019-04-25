import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({name, placeholder, value, error, icon, type, onChange}) => {
  return (

    <div className="input-group">
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        name={name}
        autoComplete={'off'}
        value={value}
        onChange={onChange}
         />
        <span className="input-group-append">
            <span className="input-group-text">
              <i className={`zmdi ${icon}`} />
            </span>
        </span>
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: 'text'
};

export default InputGroup;