import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ACTION_RESET,
} from './types';
import loggedOutAxios from '../helpers/loggedOutAxios';
import { SERVER_DOWN } from '../utils/constants';

export const userActionReset = () => {
  return {
    type: ACTION_RESET,
  };
};

export const loginUser = (authData) => (dispatch) => {
  dispatch({ type: LOGIN_LOADING });

  const dataToServer = {
    issuer: authData.issuer,
    accessToken: authData.accessToken,
  };

  loggedOutAxios
    .post('/users/login', dataToServer)
    .then((response) => {
      localStorage.token = response.accessToken;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response ? error.response.data : SERVER_DOWN,
      });
    });
};
