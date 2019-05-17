import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import 'moment/locale/uk';
import styled from 'styled-components';

import MomentLocaleUtils, {formatDate, parseDate} from "react-day-picker/moment";

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const minYear = 1980;


function YearMonthForm({date, localeUtils, onChange}) {
    const months = localeUtils.getMonths('uk');

    const years = [];
    for (let i = fromMonth.getFullYear(); i >= minYear; i -= 1) {
        years.push(i);
    }

    const handleChange = function handleChange(e) {
        const {year, month} = e.target.form;
        onChange(new Date(year.value, month.value));
    };

    return (
        <form className="DayPicker-Caption">
            <SelectWrap>
                <select name="month" onChange={handleChange} value={date.getMonth()}>
                    {months.map((month, i) => (
                        <option key={month} value={i}>
                            {month}
                        </option>
                    ))}
                </select>
            </SelectWrap>
            <SelectWrap>
                <select name="year" onChange={handleChange} value={date.getFullYear()}>
                    {years.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </SelectWrap>
        </form>
    );
}

export default class DayPickerWithYear extends React.Component {

    constructor(props) {
        super(props);
        this.handleYearMonthChange = this.handleYearMonthChange.bind(this);

        this.state = {
            month: new Date()
        };
    }

    handleYearMonthChange(month) {
        this.setState({month});
    }

    render() {

        const {placeholder, onChange} = this.props;

        const dayPickerProps = {
            month: this.state.month,
            // fromMonth: fromMonth,
            // toMonth: toMonth,
            locale: 'uk',
            localeUtils: MomentLocaleUtils,
            captionElement: ({date, localeUtils}) => (
                <YearMonthForm
                    date={date}
                    localeUtils={localeUtils}
                    onChange={this.handleYearMonthChange}
                />
            )
        };

        return (
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="zmdi zmdi-calendar-note" /></span>
                </div>
                <DayPickerInput
                    dayPickerProps={dayPickerProps}
                    format="DD-MM-YYYY"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    placeholder={placeholder}
                    onDayChange={onChange}
                />
            </div>
        );
    }
}


const SelectWrap = styled.div`
    position: relative;
    margin-right: 10px;
    display: inline-block;
    &:before {
        content: '';
        width: 0;
        height: 0;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-top: 5px solid #8f8f8f;
        position: absolute;
        top: 13px;
        right: 5px;
    }
    select {
        border-color: #d5d5d5;
        border-radius: 3px;
        padding: 5px 20px 5px 5px;
        appearance: none;
        font-size: 14px;
        background: none;
        color: #777777;
        cursor: pointer;
        line-height: 17px;
    }
`;