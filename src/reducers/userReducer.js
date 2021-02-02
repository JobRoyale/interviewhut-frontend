import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ACTION_RESET,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from '../actions/types';

const initialState = {
  loginData: {
    isLoading: false,
  },
  signUpData: {
    isLoading: false,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loginData: {
          error: false,
          isLoading: true,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginData: {
          isLoading: false,
          data: action.payload,
        },
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginData: {
          isLoading: false,
          error: action.payload,
        },
      };
    case SIGNUP_LOADING:
      return {
        ...state,
        signUpData: {
          error: false,
          isLoading: true,
        },
      };
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        signUpData: {
          isLoading: false,
          data: action.payload,
        },
      };
    }
    case SIGNUP_FAIL: {
      return {
        ...state,
        signUpData: {
          isLoading: false,
          error: action.payload,
        },
      };
    }
    case ACTION_RESET:
      return {
        ...state,
        loginData: {
          error: false,
          data: false,
        },
        signUpData: {
          error: false,
          data: false,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
