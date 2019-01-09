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
        <span className="input-group-addon" style={{paddingBottom: '7px'}}>
            <i className={`zmdi ${icon}`}></i>
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