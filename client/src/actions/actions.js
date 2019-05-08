import {GET_ERRORS, GET_POSTS, SET_SMALL_MENU, SUCCESS_SEND_RESET_PASS} from './types';

import axios from 'axios';

// Register uer
export const goToLogin = (user, history) => dispatch => {
    axios
        .post('/api/users/register', user)
        .then(() => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};

// Reset pass
export const resetPassword = email => dispatch => {
    axios
        .post('/api/users/reset-pass', email)
        .then(res => {
            dispatch({
                type: SUCCESS_SEND_RESET_PASS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        })

};


export const getNewPass = (newPassData, history) => dispatch => {
    axios
        .post(`/api/users/reset-pass/${newPassData.token}`, newPassData)
        .then(() => history.push('/login'))
        .catch(() => {
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        })
};

// change in dom
export const showSmallMenu = () => {
    return {
        type: SET_SMALL_MENU
    }
};
