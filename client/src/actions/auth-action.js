import {USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_PROFILE, LOGOUT} from './types';

import axios from 'axios';
import {getCurrentProfile} from './profile-action';
import {setAuthToken} from '../helpers/helpers';
import nprogress from "nprogress";


export const loadUser = history => async dispatch => {
    nprogress.start();
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

        dispatch(getCurrentProfile());
        nprogress.done();
    } catch (err) {
        history.push('/login');
        nprogress.done();

        console.log(err);
        dispatch({
            type: AUTH_ERROR
        });
    }
};


export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        dispatch({
            type: LOGIN_FAIL,
            payload: errors
        });
    }
};


export const loginSocial = token => async dispatch => {
    try {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: token
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({
            type: LOGIN_FAIL,
            payload: errors
        });
    }
};




// Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
}; 