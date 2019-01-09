import React from 'react';
import PropTypes from 'prop-types';

import thinking from '../../assets/images/thinking.png';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const TextAreaFieldGroup = ({name, placeholder, value, error, info, onChange, addEmoji, showEmoji, showCount }) => {


  const handleShow = () => {
      showEmoji = !showEmoji
  };

  return (
    <div className="form-group">
      <textarea
        rows="4"
        className="form-control no-resize"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      { showCount && <div className={'text-count'}>{`${value.length}/3000`}</div> }
      { error && <div className="help-info">{error}</div> }
      { info && <small className="form-text text-muted">{info}</small> }
      {
        showEmoji &&
        <Picker style={{ position: 'absolute', top: '200px', left: '0', zIndex: '1' }} onSelect={addEmoji} />
      }
    </div>
  );
};



TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
