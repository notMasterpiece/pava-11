import {GET_COMMETNS_INFO} from "../actions/types";

const initState = {
    commentsInfo: []
};


export default (state = initState, action ) => {
    switch (action.type) {
        case GET_COMMETNS_INFO:
            return {
                ...state,
                commentsInfo: action.payload
            };
        default:
            return state;
    }
}
