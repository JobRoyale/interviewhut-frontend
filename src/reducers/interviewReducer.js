import { START_INTERVIEW_SUCCESS, CLOSE_ROOM_SUCCESS } from '../actions/types';

const initialState = {
  error: '',
};

const interviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_INTERVIEW_SUCCESS:
      return {
        ...state,
        interview: action.payload,
      };
    case CLOSE_ROOM_SUCCESS:
      return {
        ...state,
        interview: null,
      };
    default:
      return state;
  }
};

export default interviewReducer;
