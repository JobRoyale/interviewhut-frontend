import {
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAIL,
  ROOM_UPDATED,
  CHAT_SUCCESS,
} from '../actions/types';

const initialState = {
  error: '',
  chatMessageList: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        room: action.payload,
      };
    case CREATE_ROOM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case JOIN_ROOM_SUCCESS:
      return {
        ...state,
        room: action.payload,
      };
    case JOIN_ROOM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ROOM_UPDATED:
      return {
        ...state,
        room: action.payload,
      };
    case CHAT_SUCCESS:
      return {
        ...state,
        chatMessageList: state.chatMessageList.concat(action.payload),
      };
    default:
      return state;
  }
};

export default roomReducer;
