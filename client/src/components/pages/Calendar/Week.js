import React from 'react';
import moment from 'moment';
import Day from "./Day";

const Week = ({previousCurrentNextView, currentMonthView, selected, select, monthEvents, events, showEventDescription}) => {

    let days = [];
    let date = previousCurrentNextView;

    for (var i = 0; i < 7; i++) {

        let day = {
            name: date.format("dd").substring(0, 1),
            number: date.date(),
            isCurrentMonth: date.month() === currentMonthView.month(),
            isToday: date.isSame(new Date(), "day"),
            date: date,
            hasEvents: false,
            events: []
        };


        for (var ev = 0; ev < events.length; ev++) {
            if ( moment(events[ev].date).isSame(date, "day") ) {
                day.events.push(events[ev]);
                day.hasEvents = true;
            }
        }


        days.push(
            <Day key={day.number}
                 day={day}
                 selected={selected}
                 select={select}
                 showEventDescription={showEventDescription}

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

export default Week;