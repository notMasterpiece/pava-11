import { GET_ALL_MESSAGES } from './types'
import axios from "axios";
import {setLoadingState} from "./post-action";


export const getAllMessages = page => dispatch => {
    dispatch(setLoadingState());
    axios
        .get(`/api/messages`)
        .then(res => {
            dispatch({
                type: GET_ALL_MESSAGES,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: GET_ALL_MESSAGES,
                payload: null
            })
        })
};