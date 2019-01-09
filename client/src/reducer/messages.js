import { GET_ALL_MESSAGES } from '../actions/types';

const initState = {
    messages: [],
    loading: false
};

export default (state = initState, action ) => {
    switch (action.type) {
        case GET_ALL_MESSAGES:
            return {
                ...state,
                messages: [...action.payload],
                loading: false
            };

        default:
            return state;
    }
}
