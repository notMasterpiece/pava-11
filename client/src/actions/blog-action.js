import axios from 'axios';
import {GET_ERRORS, GET_ARTICLE, ADD_ARTICLE, GET_ARTICLES, CLEAR_ARTICLE} from "./types";
import {setLoadingState} from "./post-action";
import nprogress from 'nprogress'



export const getAllArticles = () => dispatch => {
    nprogress.start();
    axios
        .get('/api/blog')
        .then(res => {
            nprogress.done();
            dispatch({
                type: GET_ARTICLES,
                payload: res.data
            })
        })
        .catch(err => {
            nprogress.done();
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};


export const getArticle = id => dispatch => {
    dispatch(setLoadingState());
    nprogress.start();
    axios
        .get(`/api/blog/${id}`)
        .then(res => {
            nprogress.done();
            dispatch({
                type: GET_ARTICLE,
                payload: res.data
            })
        })
        .catch(() => {
            nprogress.done();
            dispatch({
                type: GET_ARTICLE,
                payload: null
            })
        })
};






export const createPostAction = (post, history) => dispatch => {
    nprogress.start();
    const formData = new FormData();
    const config = { headers: {'content-type': 'multipart/form-data'}};

    formData.append('image_loader', post.image);
    formData.append('title', post.title);
    formData.append('short_description', post.short_description);
    formData.append('full_description', post.full_description);
    formData.append('source_link', post.source_link);
    formData.append('tags', post.tags);

    axios
        .post('/api/blog/create', formData, config)
        .then(res => {
            history.push('/blog');
            nprogress.done();
            dispatch({
                type: ADD_ARTICLE,
                payload: res.data
            })
        })
        .catch(err => {
            nprogress.done();
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};



export const clearArticle = () => {
    return {
        type: CLEAR_ARTICLE
    }
};
