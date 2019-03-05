import React from 'react';
import PropTypes from 'prop-types';
import Day from "./Day";

const Week = ({previousCurrentNextView, currentMonthView, selected, select, monthEvents}) => {

    let days = [];
    let date = previousCurrentNextView;

    for (var i = 0; i < 7; i++) {
        var dayHasEvents = false;

        for (var j = 0; j < monthEvents.length; j++) {
            if (monthEvents[j].date.isSame(date, "day")) {
                dayHasEvents = true;
            }
        }

        let day = {
            name: date.format("dd").substring(0, 1),
            number: date.date(),
            isCurrentMonth: date.month() === currentMonthView.month(),
            isToday: date.isSame(new Date(), "day"),
            date: date,
            hasEvents: dayHasEvents
        };

        days.push(
            <Day key={day.number}
                 day={day}
                 selected={selected}
                 select={select}
            />
        );
        date = date.clone();
        date.add(1, "d");
    }

    return (
        <div className="fc-row fc-week fc-widget-content fc-rigid" style={{height: '180px'}}>
            <div className="fc-bg">
                <table className="">
                    <tbody>
                    <tr>
                        {days}
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

Week.propTypes = {

};

export default Week;