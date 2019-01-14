import * as types from "../actions/types";

const initState = {
    fakeUsers: []
};


export default (state = initState, action ) => {
    switch (action.type) {
        case types.GET_FAKE_USER:
            return {
                ...state,
                fakeUsers: action.payload
            };
        default:
            return state;
    }
}
