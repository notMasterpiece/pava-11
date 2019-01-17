import { combineReducers } from 'redux';

import authReducer from './auth';
import errorsReducer from './error';
import profilereducer from './profile';
import domreducer from './dom';
import postReducer from './post';
import infoReducer from './info';
import messagesReducer from './messages';
import fakeReducer from './fake';
import blogReducer from './blog';


export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profilereducer,
  dom: domreducer,
  posts: postReducer,
  info: infoReducer,
  messages: messagesReducer,
  fakeData: fakeReducer,
  blog: blogReducer
})
