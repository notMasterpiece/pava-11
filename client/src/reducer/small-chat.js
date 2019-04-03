import { GET_CHAT_ROOM, CLOSE_SMALL_CHAT } from '../actions/types';

const initState = {
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
        default:
            return state;
    }
}
