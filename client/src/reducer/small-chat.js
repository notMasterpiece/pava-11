import { GET_CHAT_ROOM, CLOSE_SMALL_CHAT, SOCKET_INIT } from '../actions/types';

const initState = {
    socket: null,
    showSmallChat: false
};

export default (state = initState, action ) => {
    switch (action.type) {
        case GET_CHAT_ROOM:
            return {
                ...state,
                showSmallChat: true,
                ...action.payload

            };
        case CLOSE_SMALL_CHAT:
            return {
                ...state,
                showSmallChat: false,

            };
        case SOCKET_INIT:
            return {
                ...state,
                socket: action.payload,

            };
        default:
            return state;
    }
}
