import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
            onClick={() => select(day, 'test')}
        >
            {day.number}
            {
                day.events.length > 0 &&
                <EventUl className='calendar-event-ul'>
                    {
                        day.events.map(day => (
                            <EventLi key={day._id}>{day.name} ({day.user.name})</EventLi>
                        ))
                    }
                </EventUl>
            }
        </td>
    );
};

Day.propTypes = {
    day: PropTypes.object.isRequired,
    selected: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,
};

const EventUl = styled.ul`
  text-align: left;
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow: auto;
`;

const EventLi = styled.li`
  margin: 3px 0;
  color: #fff;
  background-color: #00867d; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  padding: 3px 7px; 
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;  
`;

export default Day;