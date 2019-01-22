import { GET_ARTICLES, GET_ARTICLE, CLEAR_ARTICLE } from '../actions/types';

const initState = {};

export default (state = initState, action ) => {
    switch (action.type) {
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload
            };
        case GET_ARTICLE:
            return {
                ...state,
                article: action.payload
            };
        case CLEAR_ARTICLE:
            return {
                ...state,
                article: null
            };
        default:
            return state;
    }
}
