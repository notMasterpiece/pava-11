import React, {Component} from 'react';
import styled from 'styled-components';

class EventInfo extends Component {

    render() {
        const {singleEventInfo, hideAddEventInfo} = this.props;
        const {top, left, name, description} = singleEventInfo;

        return (
            <EventWrap
                style={{top: `${top}px`, left: `${left}px`}}
                className="add-event"
            >
                <EventClose
                    className="zmdi zmdi-close-circle"
                    onClick={hideAddEventInfo}
                />
                <form>
                    <h2>Event Detail</h2>
                    <label>
                        <span>Подія</span>
                        <input
                            readOnly={true}
                            type="text"
                            value={name}
                        />
                    </label>
                    <label htmlFor="">
                        <span>Опис</span>
                        <textarea
                            readOnly={true}
                            value={description} />
                    </label>
                </form>
            </EventWrap>
        );
    }
}

const EventWrap = styled.div`
  background-color: #cfd8dc;
  display: block;
  position: absolute;
  width: 300px;
  padding: 20px;
  z-index: 10;
  transform: translateY(-20px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3);
`;


const EventClose = styled.i`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #313740;
  z-index: 1;
`;

export default EventInfo;