import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ALL_PROFILES, GET_GITHUB_PROFILE, CHANGE_COLOR } from '../actions/types';

const initState = {
  profile: null,
  all_profiles: null,
  loading: false,
  color: '#fff'
};

export default (state = initState, action ) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_GITHUB_PROFILE:
      return {
        ...state,
        github: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        all_profiles: action.payload,
        loading: false
      };
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.payload
      };
    default:
      return state;
  }
}
