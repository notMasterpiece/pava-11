import React, {Component} from 'react';
import styled from 'styled-components';

import Button from '../../Tools/LoadingBtn/Button';
import PropTypes from "prop-types";

class EventInfo extends Component {

    state = {
        name: '',
        description: '',
        errorName: '',
        errorDescription: ''
    };


    onChange = e => {
        const {name, description} = this.state;
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if(name.trim().length >= 4) {
                this.setState({
                    errorName : ''
                })
            }
            if(description.trim().length >= 4) {
                this.setState({
                    errorDescription : ''
                })
            }
        });

    };

    addEventFunc = e => {
        e.preventDefault();
        const {name, description, errorName, errorDescription} = this.state;
        const { date, setLoadingBtnTrue } = this.props;



        const eventData = {
            name,
            description,
            date
        };


        setLoadingBtnTrue();
        this.props.addEventAction(eventData);
    };

    render() {
        const {hideEventForm, addEventForm, loadingBtn, singleEventInfo} = this.props;
        const { name, description, errorDescription, errorName } = this.state;
        return (
            <EventWrap
                style={{top: `${singleEventInfo.position.top}px`, left: `${singleEventInfo.position.left}px`}}
                className="add-event"
                ref={addEventForm}
            >
                <i
                    className="zmdi zmdi-close-circle"
                    onClick={ hideEventForm }
                />
                <form>
                    <h2>Add task to calendar</h2>
                    <label htmlFor="">
                        <span>Подія</span>
                        <input
                            autoComplete={'new-password'}
                            type="text"
                            value={name}
                            name={'name'}
                            onChange={this.onChange}
                            placeholder={'Назва події'}
                        />
                        { errorName && <span className='error'>{errorName}</span> }
                    </label>
                    <label htmlFor="">
                        <span>Опис</span>
                        <textarea
                            name={'description'}
                            onChange={this.onChange}
                            placeholder={'Опис події'}
                            value={description} />
                        {errorDescription && <span className='error'>{errorDescription}</span>}
                    </label>

                    <Button
                        onClick={ this.addEventFunc }
                        loadingBtn={loadingBtn}
                        text={'Додати подію'} />
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

export default EventInfo;