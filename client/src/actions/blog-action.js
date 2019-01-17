import axios from 'axios';
import {GET_ERRORS, GET_ARTICLE} from "./types";



export const getAllArticles = () => dispatch => {
    axios
        .get('/api/blog')
        .then(res => {
            dispatch({
                type: GET_ARTICLE,
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

export const createPostAction = post => dispatch => {

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
            dispatch({
                type: '',
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
