import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectListGroup = ({value, error, info, options, onChangeSelect }) => {
    return (
    <div className="form-group">
        <SelectWrap>
            <select
                name="status"
                value={value}
                placeholder="Виберіть категорію ..."
                onChange={e => onChangeSelect(e.target.value)}
            >
                {options && options.map(o => (
                    <option key={o.value} value={o.label}>{o.value}</option>
                ))}
            </select>
        </SelectWrap>
        { error && <div className="help-info">{error}</div> }
        { info && <small className="form-text text-muted">{info}</small> }
    </div>
  );
};



const SelectWrap = styled.div`
    width: 100%;
    position: relative;
    white-space: nowrap;
    font-size: 0;
    select {
        appearance: none;
        width: 100%;
        border: 1px solid #E3E3E3;
        border-radius: 30px;
        font-size: 14px;
        padding: 8px 30px 9px 12px;
        background-color: #fff;
    }
`;

SelectListGroup.propTypes = {
  value: PropTypes.any,
  info: PropTypes.string,
  error: PropTypes.string,
  onChangeSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
