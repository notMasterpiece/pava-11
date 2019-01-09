import { ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST } from '../actions/types';

const initState = {
  posts: [],
  onePost: {},
  loading: false
};

export default (state = initState, action ) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        onePost: action.payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p._id !== action.payload)
      };

    default:
      return state;
  }
}
