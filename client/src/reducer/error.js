import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initState = {
  text: ''
};


export default function (state = initState, action ) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {
        text: null
      };
    default:
      return state;
  }
}
