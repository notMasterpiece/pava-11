import axios from 'axios';
import {GET_ERRORS, GET_COMMETNS_INFO} from "./types";


export const getCommentsInfo = () => dispatch => {
    axios
        .get('/api/admin/comments')
        .then(res => {
            dispatch({
                type: GET_COMMETNS_INFO,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: GET_ERRORS,
                payload: null
            })
        })
};
