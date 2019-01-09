import axios from 'axios';
import { ADD_POST, GET_ERRORS, POST_LOADING, GET_POSTS, GET_POST, CLEAR_ERRORS} from './types';


export const addPost = (post, history) => dispatch => {
  axios
    .post('/api/posts', post)
    .then(res => {
      history.push('/posts');
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};



export const getAllPost = page => dispatch => {
    dispatch(setLoadingState());
  axios
    .get(`/api/posts?page=${page}`)
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data.posts
      })
    })
    .catch(() => {
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    })
};



export const getAllPostWithOutLoading = page => dispatch => {
    axios
        .get(`/api/posts?page=${page}`)
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data.posts
            })
        })
        .catch(() => {
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        })
};



export const getPost = id => dispatch => {
  dispatch(setLoadingState());
  axios
    .get(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(() => {
      dispatch({
        type: GET_POST,
        payload: null
      })
    })
};


// set loading state
export const setLoadingState = () => {
  return {
    type: POST_LOADING
  }
};



// delete own post
export const deletePost = (id, page) => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(() => {
        dispatch(getAllPostWithOutLoading(page));
    })
    .catch(() => {
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    })
};



// add Comment
export const addComment = (id, comment) => dispatch => {
  axios
    .post(`/api/posts/comments/${id}`, comment)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};



// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/uncomments/${postId}/${commentId}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};




// add like to post
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(() => dispatch(getAllPostWithOutLoading() ))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};


// remove like from post
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(() => dispatch(getAllPost() ))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};


// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
};