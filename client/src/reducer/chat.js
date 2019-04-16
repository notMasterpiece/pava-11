import { SHOW_SMALL_CHAT, HIDE_SMALL_CHAT } from '../actions/types';

const initState = {};

export default (state = initState, action ) => {
    switch (action.type) {
        case SHOW_SMALL_CHAT:
            return {
                ...state,
                showSmallChat: true
            };
        case HIDE_SMALL_CHAT:
            return {
                ...state,
                showSmallChat: false
            };
        default:
            return state;
    }
}
