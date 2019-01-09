import {SET_CURRENT_USER, SUCCESS_SEND_RESET_PASS} from '../actions/types';

import { isEmpty } from '../helpers/helpers';

const initState = {
  success_send_reset_pass: false,
  isAuthenticated : false,
  user : {}
};


export default (state = initState, action ) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SUCCESS_SEND_RESET_PASS:
      return {
        ...state,
        success_send_reset_pass: true
      };
    default:
      return state;
  }
}
