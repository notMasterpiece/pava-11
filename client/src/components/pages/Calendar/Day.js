import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";

const Day = ({day, selected, select}) => {
    return (
        <td
            className={
                "vp-day" +
                (day.isToday ? " today" : "") +
                (day.isCurrentMonth ? "" : " vp-day__past") +
                (day.date.isSame(selected) ? " selected" : "") +
                (day.hasEvents ? " has-events" : "")
            }
            onClick={() => select(day, 'test') }
        >
            {day.number}
        </td>
    );
};

Day.propTypes = {
    day: PropTypes.object.isRequired,
    selected: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,
};

export default Day;