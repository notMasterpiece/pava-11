import { GET_ERRORS, CLEAR_ERRORS, GLOBAL_ERROR } from '../actions/types';

const initState = {
  text: '',
};


export default function (state = initState, action ) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {
        text: null
      };
    case GLOBAL_ERROR:
      return {
        ...state,
        global_error: true
      };
    default:
      return state;
  }
}
