import {GET_ERRORS, GET_POSTS, SET_CURRENT_USER, SET_SMALL_MENU, SUCCESS_SEND_RESET_PASS} from './types';

import axios from 'axios';
import { setAuthToken } from '../helpers/helpers';
import jwt_decode from 'jwt-decode';


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


// Login user, get user token
export const loginUser = user => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios
    .post('/api/users/login', user, config)
      .then(res => {
        const { token } = res.data;

        localStorage.setItem('jwtToken', token);

        // Set token to Auth header
        setAuthToken(token);
        //Decode token
        const decode = jwt_decode(token);
        //set current user
        dispatch(setCurrentUser(decode));

      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })

};

export const loginUserBySocial = token => dispatch => {
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decode = jwt_decode(token);
    dispatch(setCurrentUser(decode));
};



// Login user by facebook
export const loginUserbyFacebook = user => dispatch => {
    axios
        .post('/api/users/login/provider', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);

            // Set token to Auth header
            setAuthToken(token);
            //Decode token
            const decode = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decode));

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

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


export const setCurrentUser = decode => {
    return {
    type: SET_CURRENT_USER,
    payload: decode
  }
};


// User log out
export const logoutUser = id => dispatch => {

    axios
        .post('/api/users/logout', {id})
        .then(() => {
            // remove token from localStorage
            localStorage.removeItem('jwtToken');
            setAuthToken(false);
            // set isAuthenticated to false
            dispatch(setCurrentUser({}));

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};





// change in dom
export const showSmallMenu = () => {
  return {
    type: SET_SMALL_MENU
  }
};
