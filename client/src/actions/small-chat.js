import axios from 'axios';
import {GET_ERRORS, GET_CHAT_ROOM, CLOSE_SMALL_CHAT} from './types';

export const createChatToUser = user => dispatch => {
    axios
        .post('/api/chat', {user})
        .then( room => {
            dispatch({
                type: GET_CHAT_ROOM,
                payload: room.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

};
export const closeSmallchat = () => {
    return {
        type: CLOSE_SMALL_CHAT
    }
};