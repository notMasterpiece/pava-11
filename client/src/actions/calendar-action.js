import axios from 'axios';
import {GET_ALL_CALENDAR_EVENTS, ADD_CALENDAR_EVENT, GET_ERRORS} from "./types";



export const getAllEvents = () => dispatch => {
    axios
        .get('/api/calendar')
        .then(res => {
            dispatch({
                type: GET_ALL_CALENDAR_EVENTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};




export const addEventAction = eventData => dispatch => {
    axios
        .post('/api/calendar', eventData)
        .then(() => { dispatch(getAllEvents()) })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};


