import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import Week from './Week';
import EventForm from './Event';
import EventInfo from './EventInfo';
import Autocomplete from '../../Tools/Autocomplete/Autocomplete';

import { connect } from 'react-redux';
import { addEventAction, getAllEvents } from '../../../actions/calendar-action';


import {getCoords} from '../../../helpers/helpers';


class CalendarEvent extends React.Component {
    constructor(props) {
        super(props);
        this.addEventForm = React.createRef();

        this.state = {
            selectedMonth: moment(),
            selectedDay: moment().startOf("day"),
            selectedMonthEvents: [],

            events: [],

            showEventInfo: false,
            singleEventInfo: null,

            showAddEventForm: false,
            showAddEventInfo: null,

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
            selectedMonth: currentMonthView.subtract(1, "month"),
            showAddEventForm: false
        });
    };

    next = () => {
        const currentMonthView = this.state.selectedMonth;
        this.setState({
            selectedMonth: currentMonthView.add(1, "month"),
            showAddEventForm: false
        });
    };


    select = obj => {
        const {day, node} = obj;

        const pos = getCoords(node);

        this.setState({
            selectedMonth: day.date,
            selectedDay: day.date.clone(),
            showAddEventForm: true,
            showAddEventInfo: {
                top: pos.top,
                left: pos.left - 82
            }
        });
    };



    selectInAutocomplete = day => {
        const momentDay = moment(day);

        this.setState({
            showEventInfo: true,
            selectedMonth: momentDay,
            selectedDay: momentDay,
        });
    };


    goToCurrentMonthView = () => {
        this.setState({
            selectedMonth: moment(),
            showAddEventForm: false
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
        const {events} = this.state;

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
                    showEventDescription={this.showEventDescription}
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
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.calendar) {
            this.setState({
                events: nextProps.calendar.calendar
            }, () => {

                this.setState({
                    loadingBtn: false,
                    showAddEventForm: false
                })

            });
        }
    }



    // EVENTS FUNCTION

    hideAddEventForm = () => {
        this.setState({
            showAddEventForm: false
        })
    };
    hideAddEventInfo = () => {
        this.setState({
            showEventInfo: false
        })
    };

    showEventDescription = (day, e) => {
        console.log(day);
        console.log(e.currentTarget);
        this.hideAddEventForm();
        if(!e.currentTarget) return;

        const pos = getCoords(e.currentTarget);

        this.setState({
            showEventInfo: true,
            singleEventInfo: {
                top: pos.top,
                left: pos.left,
                name: day.name,
                description: day.description,
                createdAt: day.createdAt,
                user: day.user
            }
        })
    };




    componentDidMount() {
        this.props.getAllEvents();
    }


    render() {

        const {selectedDay, loadingBtn, events, showEventInfo, singleEventInfo, showAddEventForm, showAddEventInfo} = this.state;

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
                            <div className="fc-right">
                                <Autocomplete
                                    selectInAutocomplete={this.selectInAutocomplete}
                                    options={events} />
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

                        {
                            showAddEventForm &&
                            <EventForm
                                loadingBtn={loadingBtn}
                                setLoadingBtnTrue={this.setLoadingBtnTrue}
                                date={moment(selectedDay).format()}
                                addEventForm={this.addEventForm}
                                showAddEventInfo={showAddEventInfo}
                                hideAddEventForm={this.hideAddEventForm}
                                addEventAction={this.props.addEventAction} />
                        }


                        {
                            showEventInfo &&
                                <EventInfo
                                    singleEventInfo={singleEventInfo}
                                    hideAddEventInfo={this.hideAddEventInfo}
                                />
                        }

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
