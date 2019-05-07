import axios from 'axios';
import {
    PROFILE_ERROR,
    SET_CURRENT_USER,
    GET_USER_PHOTO,
    ADD_PHOTO,
    REMOVE_PHOTO,
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE,
    PROFILE_LOADING,
    GET_ERRORS,
    GET_ALL_PROFILES,
    GET_GITHUB_PROFILE,
    CHANGE_COLOR
} from './types';

import { setAuthToken } from '../helpers/helpers';
import nprogress from "nprogress";

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// get profile by id
export const getProfileById = id => dispatch => {
  dispatch( setProfileLoading() );
  axios.get(`/api/profile/user/${id}`)
    .then(profile => {
      dispatch({
        type: GET_PROFILE,
        payload: profile.data
      })
    })
    .catch(() => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    })
};





// get profile by Hangle
export const getProfileByHangle = handle => dispatch => {
    dispatch( setProfileLoading() );
    axios.get(`/api/profile/handle/${handle}`)
        .then(profile => {
            dispatch({
                type: GET_PROFILE,
                payload: profile.data
            })
        })
        .catch(() => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
};



// get Github by Hangle
export const getGithubByHangle = handle => dispatch => {
  dispatch( setProfileLoading() );
  axios.defaults.headers.common['Authorization'] = '';
  axios.get(`https://api.github.com/users/${handle}/repos?client_id=bf06202cf02893afdf81&client_secret=a588c7f83dee5840e0572e55fe452f2d3515ca8a&sort=created:asc`)
    .then(profile => {
      setAuthToken(localStorage.getItem('jwtToken'));
      dispatch({
        type: GET_GITHUB_PROFILE,
        payload: profile.data
      })
    })
    .catch(() => {
      dispatch({
        type: GET_GITHUB_PROFILE,
        payload: {}
      })
    })
};




// profileLoading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
};


// clear profile
export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
};



// Create profile
export const createProfile = (profileData, history) => dispatch => {
  nprogress.start();
  const formData = new FormData();
  const config = { headers: {'content-type': 'multipart/form-data'}};

  formData.append('avatar', profileData.avatar);

  formData.append('handle', profileData.handle);
  formData.append('company', profileData.company);
  formData.append('website', profileData.website);
  formData.append('location', profileData.location);
  formData.append('status', profileData.status);
  formData.append('skills', profileData.skills);
  formData.append('bio', profileData.bio);
  formData.append('github', profileData.github);
  formData.append('experience', profileData.experience);
  formData.append('youtube', profileData.youtube);
  formData.append('twitter', profileData.twitter);
  formData.append('facebook', profileData.facebook);
  formData.append('linkedin', profileData.linkedin);


  axios.post('/api/profile', formData, config)
    .then(() => {
        history.push('/dashboard');
        nprogress.done();
    })
    .catch(err => {
      nprogress.done();
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};



// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Ви точнооооо впевненні?')) {
    axios
      .delete('/api/profile')
      .then(() =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};


// Add Experiense
export const addExperiense = (experienseData, history) => dispatch => {
  axios.post('/api/profile/experience', experienseData)
    .then(() => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};


// Delete Experiense
export const deleteExp = (id) => dispatch => {
  axios.delete(`/api/profile/experience/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
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


// Add Education
export const addEducation = (addEducationData, history) => dispatch => {
  axios.post('/api/profile/education', addEducationData)
    .then(() => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

// Delete Education
export const deleteEdu = (id) => dispatch => {
  axios.delete(`/api/profile/education/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
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



// get All Profiles
export const getAllProfiles = () => dispatch => {
  dispatch( setProfileLoading());
  axios.get('/api/profile/all')
    .then(res => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: res.data
      })
    })
    .catch(() => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: null
      })
    })
};


export const changeColor = color =>  {
  localStorage.setItem('color', color);
  document.body.style.backgroundColor = color;
  return {
    type: CHANGE_COLOR,
    payload: color
  }
};


export const addUserPhoto = (formData, config)  => dispatch => {
    axios.post('/api/upload/gallery', formData, config)
        .then(res => {
            dispatch({
                type: ADD_PHOTO,
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


export const getUserPhoto = () => dispatch => {
    axios.get('/api/upload')
        .then(res => {
            dispatch({
                type: GET_USER_PHOTO,
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


export const deleteUserPhoto = id => dispatch => {
    axios.post(`/api/upload/delete/${id}`, id)
        .then(res => {
            dispatch({
                type: REMOVE_PHOTO,
                payload: res.data.payload
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

export const downloadPhoto = (img, name) => dispatch => {
    axios.post('/api/upload/download/', {img, name})
        .then(res => {
            dispatch({
                type: REMOVE_PHOTO,
                payload: res.data.payload
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};


