import * as types from "../actions/types";

const initState = {
    calendar: []
};


export default (state = initState, action ) => {
    switch (action.type) {
        case types.GET_ALL_CALENDAR_EVENTS:
            return {
                ...state,
                calendar: action.payload
            };
        case types.ADD_CALENDAR_EVENT:
            return {
                ...state,
                calendar: action.payload,
                eventAdded: true
            };
        default:
            return state;
    }
}
