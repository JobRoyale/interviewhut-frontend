import { combineReducers } from 'redux';
import interviewReducer from './interviewReducer';
import roomReducer from './roomReducer';
import socketReducer from './socketReducer';
import userReducer from './userReducer';

export default combineReducers({
  userData: userReducer,
  socketData: socketReducer,
  roomData: roomReducer,
  interviewData: interviewReducer,
});
