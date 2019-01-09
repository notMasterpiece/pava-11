import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectListGroup = ({ name, value, error, info, options, onChangeSelect }) => {
    return (
    <div className="form-group">
        <Select

            name="status"
            value={value}
            options={options}
            placeholder="Виберіть категорію ..."
            searchable={false}
            onChange={onChangeSelect}

            // value={value}
            // onChange={onChangeSelect}
            // options={options}
            // defaultValue={defaultValue}
        />
        { error && <div className="help-info">{error}</div> }
        { info && <small className="form-text text-muted">{info}</small> }
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  info: PropTypes.string,
  error: PropTypes.string,
  onChangeSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
