import { CREATE_ROOM_SUCCESS, CREATE_ROOM_FAIL } from '../actions/types';

const initialState = {
  error: '',
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
    default:
      return state;
  }
};

export default roomReducer;
