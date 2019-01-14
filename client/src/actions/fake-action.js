import axios from 'axios';
import * as types from './types';

export const getFakeUser = page => dispatch => {
    axios
        .get(`/api/fake?page=${page}`)
        .then(res => {
            dispatch({
                type: types.GET_FAKE_USER,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: types.GET_ERRORS,
                payload: null
            })
        })
};
