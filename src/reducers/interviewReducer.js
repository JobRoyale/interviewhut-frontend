import { START_INTERVIEW_SUCCESS } from '../actions/types';

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
    default:
      return state;
  }
};

export default interviewReducer;
