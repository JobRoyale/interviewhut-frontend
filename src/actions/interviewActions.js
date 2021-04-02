import { START_INTERVIEW_SUCCESS } from './types';

export const startInterview = (socket) => (dispatch) => {
  socket.emit('START_COMPETITION', {}, (data) => {
    if (data) {
      dispatch({
        type: START_INTERVIEW_SUCCESS,
        payload: data,
      });
    }
  });
};
