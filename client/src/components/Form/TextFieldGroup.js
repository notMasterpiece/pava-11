import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({name, placeholder, value, error, info, type, onChange, disabled}) => {
  return (
    <div className={classnames('form-group', {
      'has-danger': error
    })}>
      <input
        autoComplete={'off'}
        type={type}
        className={classnames('form-control form-control-lg', {
          'form-control-danger': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <div className="help-info">{error}</div>}
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;