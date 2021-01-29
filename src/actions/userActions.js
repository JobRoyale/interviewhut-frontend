import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
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
      localStorage.token = response.data.payload.accessToken;
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

export const signUpUser = (authData) => (dispatch) => {
  dispatch({ type: SIGNUP_LOADING });

  const dataToServer = {
    issuer: authData.issuer,
    accessToken: authData.accessToken,
    signUpType: authData.signUpType,
    password: authData.password,
  };

  loggedOutAxios
    .post('/users/signup', dataToServer)
    .then((response) => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: SIGNUP_FAIL,
        payload: error.response ? error.response.data : SERVER_DOWN,
      });
    });
};
