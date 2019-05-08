import {SUCCESS_SEND_RESET_PASS, USER_LOADED, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT} from '../actions/types';

const initState = {
  token: localStorage.getItem('token'),
  success_send_reset_pass: false,
  isAuthenticated : null,
  loading: true,
  user : null
};


export default (state = initState, action ) => {
  const {payload} = action;
  switch (action.type) {

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: null,
        loading: false
      };

    case REGISTER_FAIL:
    // case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: true
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
