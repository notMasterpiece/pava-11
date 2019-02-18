import {GET_TASKS} from '../actions/types';

const initState = {
    task: []
};

export default (state = initState, action ) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                task: action.payload
            }
        default:
            return state;
    }
}
