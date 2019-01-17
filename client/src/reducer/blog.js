import { GET_ARTICLE } from '../actions/types';

const initState = {};

export default (state = initState, action ) => {
    switch (action.type) {
        case GET_ARTICLE:
            return {
                ...state,
                articles: action.payload
            };
        default:
            return state;
    }
}
