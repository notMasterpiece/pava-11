import {GET_USER_PHOTO, ADD_PHOTO, REMOVE_PHOTO} from '../actions/types';

const initState = {
    loading: true,
    photo: []
};

export default (state = initState, action ) => {
    switch (action.type) {
        case GET_USER_PHOTO:
            return {
                ...state,
                photo: action.payload
            };
        case REMOVE_PHOTO:

            return {
                ...state,
                photo: state.photo.filter(ph => ph._id !== action.payload)
            };
        case ADD_PHOTO:

            return {
                ...state,
                photo: [...state.photo, ...action.payload]
            };
        default:
            return state;
    }
}
