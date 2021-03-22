import {
    CONNECTION_ACCEPTED,
    CONNECTION_FAILED,
  } from '../actions/types';

const initialState = {
    socket: null,
    loading: false,
    error: "",
}

const socketReducer = (state = initialState,action) => {
    switch(action.type){
        case CONNECTION_ACCEPTED:
            return{
                ...state,
                socket: action.payload,
            };
        case CONNECTION_FAILED:
            return{
                ...state,
                error: action.payload,
            };
            default:
                return state;
    }
}

export default socketReducer;