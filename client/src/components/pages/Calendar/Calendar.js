import React, {Component, Fragment} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import Week from './Week';
import EventForm from './Event';

import { connect } from 'react-redux';
import { addEventAction, getAllEvents } from '../../../actions/calendar-action';


class CalendarEvent extends React.Component {
    constructor(props) {
        super(props);
        this.addEventForm = React.createRef();

        this.state = {
            selectedMonth: moment(),
            selectedDay: moment().startOf("day"),
            selectedMonthEvents: [],
            events: [],
            showEvents: false,
            showAddEvent: false,
            loadingBtn: false
        };
    }


    setLoadingBtnTrue = () => {
        this.setState({
            loadingBtn: true
        })
    };

    setLoadingBtnFalse = () => {
        this.setState({
            loadingBtn: false
        })
    };


    renderDaysName = () => {
        const weekdays = moment.weekdays(true);

        return weekdays.map(day => (
            <th
                key={day}
                className="fc-day-header fc-widget-header fc-sun"
            >
                <span>{day}</span>
            </th>
        ))
    };


    previous = () => {
        const currentMonthView = this.state.selectedMonth;

        this.setState({
            selectedMonth: currentMonthView.subtract(1, "month")
        });
    };

    next = () => {
        const currentMonthView = this.state.selectedMonth;
        this.setState({
            selectedMonth: currentMonthView.add(1, "month")
        });
    };

    select = (day) => {

        this.setState({
            selectedMonth: day.date,
            selectedDay: day.date.clone(),
            showAddEvent: true
        });
    };

    goToCurrentMonthView = () => {
        const currentMonthView = this.state.selectedMonth;
        this.setState({
            selectedMonth: moment()
        });
    };

    renderMonthLabel = () => {
        const currentMonthView = this.state.selectedMonth;
        return (
            <span className="box month-label">{currentMonthView.format("MMMM")},
                <strong> {currentMonthView.format("YYYY")}</strong>
            </span>
        );
    };

    renderTodayLabel = () => {
        return (
            <div>
                <button type="button"
                        className="fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right"
                        onClick={this.goToCurrentMonthView}
                >
                    Сьогодні
                </button>
            </div>
        );
    };

    renderWeeks = () => {
        const currentMonthView = this.state.selectedMonth;
        const currentSelectedDay = this.state.selectedDay;
        const monthEvents = this.state.selectedMonthEvents;
        const {showAddEvent, events} = this.state;

        let weeks = [];
        let done = false;
        let previousCurrentNextView = currentMonthView
            .clone()
            .startOf("month")
            .subtract(1, "d")
            .day("Monday")
            .add(1, 'd');

        let count = 0;
        let monthIndex = previousCurrentNextView.month();

        while (!done) {
            weeks.push(
                <Week
                    events={events}
                    key={previousCurrentNextView._d}
                    previousCurrentNextView={previousCurrentNextView.clone()}
                    currentMonthView={currentMonthView}
                    monthEvents={monthEvents}
                    selected={currentSelectedDay}
                    select={day => this.select(day)}
                />
            );
            previousCurrentNextView.add(1, "w");
            done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
            monthIndex = previousCurrentNextView.month();
        }
        return weeks;
    }

    handleAdd() {
        // const monthEvents = this.state.selectedMonthEvents;
        // const currentSelected
        //
        //
        //     = this.state.selectedDay;
        //
        // let newEvents = [];
        //
        // var eventTitle = prompt("Please enter a name for your event: ");
        //
        // switch (eventTitle) {
        //     case "":
        //         alert("Event name cannot be empty.");
        //         break;
        //     case null:
        //         alert("Changed your mind? You can add one later!");
        //         break;
        //     default:
        //         var newEvent = {
        //             title: eventTitle,
        //             date: currentSelectedDate,
        //             dynamic: true
        //         };
        //
        //         newEvents.push(newEvent);
        //
        //         for (var i = 0; i < newEvents.length; i++) {
        //             monthEvents.push(newEvents[i]);
        //         }
        //
        //         this.setState({
        //             selectedMonthEvents: monthEvents
        //         });
        //         break;
        // }
    }

    addEvent() {
        // const currentSelectedDate = this.state.selectedDay;
        // let isAfterDay = moment().startOf("day").subtract(1, "d");
        //
        // if (currentSelectedDate.isAfter(isAfterDay)) {
        //     this.handleAdd();
        // } else {
        //     if (confirm("Are you sure you want to add an event in the past?")) {
        //         this.handleAdd();
        //     } else {
        //     } // end confirm past
        // } //end is in the past
    }

    removeEvent(i) {
        // const monthEvents = this.state.selectedMonthEvents.slice();
        // const currentSelectedDate = this.state.selectedDay;
        //
        // if (confirm("Are you sure you want to remove this event?")) {
        //     let index = i;
        //
        //     if (index != -1) {
        //         monthEvents.splice(index, 1);
        //     } else {
        //         alert("No events to remove on this day!");
        //     }
        //
        //     this.setState({
        //         selectedMonthEvents: monthEvents
        //     });
        // }
    }

    initialiseEvents() {
        const monthEvents = this.state.selectedMonthEvents;

        let allEvents = [];

        var event1 = {
            title:
                "Press the Add button and enter a name for your event. P.S you can delete me by pressing me!",
            date: moment(),
            dynamic: false
        };

        var event2 = {
            title: "Event 2 - Meeting",
            date: moment().startOf("day").subtract(2, "d").add(2, "h"),
            dynamic: false
        };

        var event3 = {
            title: "Event 3 - Cinema",
            date: moment().startOf("day").subtract(7, "d").add(18, "h"),
            dynamic: false
        };

        var event4 = {
            title: "Event 4 - Theater",
            date: moment().startOf("day").subtract(16, "d").add(20, "h"),
            dynamic: false
        };

        var event5 = {
            title: "Event 5 - Drinks",
            date: moment().startOf("day").subtract(2, "d").add(12, "h"),
            dynamic: false
        };

        var event6 = {
            title: "Event 6 - Diving",
            date: moment().startOf("day").subtract(2, "d").add(13, "h"),
            dynamic: false
        };

        var event7 = {
            title: "Event 7 - Tennis",
            date: moment().startOf("day").subtract(2, "d").add(14, "h"),
            dynamic: false
        };

        var event8 = {
            title: "Event 8 - Swimmming",
            date: moment().startOf("day").subtract(2, "d").add(17, "h"),
            dynamic: false
        };

        var event9 = {
            title: "Event 9 - Chilling",
            date: moment().startOf("day").subtract(2, "d").add(16, "h"),
            dynamic: false
        };

        var event10 = {
            title:
                "Hello World",
            date: moment().startOf("day").add(5, "h"),
            dynamic: false
        };

        allEvents.push(event1);

        for (var i = 0; i < allEvents.length; i++) {
            monthEvents.push(allEvents[i]);
        }

        this.setState({
            selectedMonthEvents: monthEvents
        });
    }


    hideEventForm = () => {
        this.addEventForm.current.style.display = 'none';
    };


    componentWillReceiveProps(nextProps) {
        if(nextProps.calendar) {
            this.setState({
                events: nextProps.calendar.calendar
            }, () => {


                this.setLoadingBtnFalse();


                this.hideEventForm();

            });
            return
        }

        if (nextProps.calendar.eventAdded) {
            this.hideEventForm();
            return
        }
    }





    componentDidMount() {

        this.props.getAllEvents();


        let mounthDays = document.querySelectorAll('.vp-day:not(.vp-day__past)');

        [].forEach.call(mounthDays, day => {
            day.addEventListener('click', e => {
                const el = e.target.tagName !== 'td' ? e.target.closest('.vp-day') : e.target;
                var box = el.getBoundingClientRect();

                let scrollTop = window.pageYOffset,
                    top = box.top + scrollTop,
                    left = box.left;

                if ( (left + 700) > window.innerWidth ) {
                    left = box.left - (340 + e.target.offsetWidth);
                }

                if((top + e.target.offsetHeight) > window.innerHeight) {
                    top = box.top + scrollTop - e.target.offsetHeight;
                }

                this.addEventForm.current.style.display = 'block';
                this.addEventForm.current.style.top = top - 10 + 'px';
                this.addEventForm.current.style.left = left - 85 + 'px';
            })
        })
    }


    render() {

        const {selectedDay, loadingBtn} = this.state;

        return (
            <div className="card">
                <div className="body">
                    <div id="calendar" className="fc fc-unthemed fc-ltr">
                        <div className="fc-toolbar fc-header-toolbar">
                            <div className="fc-left">
                                <div className="fc-button-group">
                                    <button type="button"
                                            className="fc-prev-button fc-button fc-state-default fc-corner-left"
                                            aria-label="prev"
                                            onClick={this.previous}
                                    >
                                        <span className="fc-icon fc-icon-left-single-arrow"/>
                                    </button>
                                    <button type="button"
                                            className="fc-next-button fc-button fc-state-default fc-corner-right"
                                            aria-label="next"
                                            onClick={this.next}
                                    >
                                        <span className="fc-icon fc-icon-right-single-arrow"/>
                                    </button>
                                </div>

                                {this.renderTodayLabel()}

                            </div>
                            <div className="fc-center">
                                <h2>
                                    {this.renderMonthLabel()}
                                </h2>
                            </div>
                            <div className="fc-clear"/>
                        </div>
                        <div className="fc-view-container">
                            <div className="fc-view fc-month-view fc-basic-view">
                                <table className="">
                                    <thead className="fc-head">
                                    <tr>
                                        <td className="fc-head-container fc-widget-header">
                                            <div className="fc-row fc-widget-header">
                                                <table className="">
                                                    <thead>
                                                    <tr>
                                                        {this.renderDaysName()}
                                                    </tr>
                                                    </thead>
                                                </table>

                                            </div>
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody className="fc-body">
                                    <tr>
                                        <td className="fc-widget-content">
                                            <div className="fc-scroller fc-day-grid-container">
                                                <div className="fc-day-grid fc-unselectable">
                                                    {this.renderWeeks()}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <EventForm
                            loadingBtn={loadingBtn}
                            setLoadingBtnTrue={this.setLoadingBtnTrue}
                            date={moment(selectedDay).format()}
                            addEventForm={this.addEventForm}
                            addEventAction={this.props.addEventAction}
                            hideEventForm={this.hideEventForm} />
                    </div>
                </div>
            </div>
        );
    }
}

CalendarEvent.propTypes = {
    addEventAction: PropTypes.func.isRequired,
};

export default connect(state => ({
    calendar: state.calendar
}), {addEventAction, getAllEvents})(CalendarEvent);
