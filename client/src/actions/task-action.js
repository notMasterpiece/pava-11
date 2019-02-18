
import axios from 'axios';
import {GET_TASKS, GET_ERRORS} from './types';
import {setCurrentUser} from "./actions";


export const getTasks = () => dispatch => {
    axios
        .get('/api/task')
        .then( tasks => {
            dispatch({
                type: GET_TASKS,
                payload: tasks.data
            })
        })
};


export const addTask = task => dispatch => {
    const tskObj = {task};
    axios
        .post('/api/task', tskObj)
        .then(() => {
            dispatch(getTasks());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

};