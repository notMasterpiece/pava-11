import { combineReducers } from 'redux';

import authReducer from './auth';
import errorsReducer from './error';
import profilereducer from './profile';
import domreducer from './dom';
import postReducer from './post';
import infoReducer from './info';
import messagesReducer from './messages';


export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profilereducer,
  dom: domreducer,
  posts: postReducer,
  info: infoReducer,
  messages: messagesReducer
})
