import React, {Component} from 'react';
import styled from 'styled-components';

import Button from '../../Tools/LoadingBtn/Button';

class Event extends Component {

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
        const {name, description} = this.state;
        const { date, setLoadingBtnTrue } = this.props;



        const eventData = {
            name,
            description,
            date
        };

        setLoadingBtnTrue();
        this.props.addEventAction(eventData);
    };


    resetEventFormState = () => {
        this.setState({
            name: '',
            description: ''
        })
    };


    render() {
        const {addEventForm, loadingBtn, showAddEventInfo:{top, left}, hideAddEventForm} = this.props;
        const { name, description, errorDescription, errorName } = this.state;

        return (
            <EventWrap
                className="add-event"
                ref={addEventForm}
                style={{top: `${top}px`, left: `${left}px`}}
            >
                <EventClose
                    className="zmdi zmdi-close-circle"
                    onClick={hideAddEventForm}
                />
                <form>
                    <h2>Add task to calendar</h2>
                    <label htmlFor="">
                        <span>Подія</span>
                        <input
                            autoFocus
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
  position: absolute;
  width: 300px;
  padding: 20px;
  z-index: 10;
  transform: translateY(-20px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3);
`;

const EventClose = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #313740;
  z-index: 1;
`;

export default Event;