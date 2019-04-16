import {SHOW_SMALL_CHAT, HIDE_SMALL_CHAT} from './types';

export const showSmallChat = () => {
    return {
        type: SHOW_SMALL_CHAT
    }
};

export const hideSmallChat = () => {
    return {
        type: HIDE_SMALL_CHAT
    }
};
