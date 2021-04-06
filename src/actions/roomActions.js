import {
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAIL,
  ROOM_UPDATED,
  CHAT_SUCCESS,
} from './types';
import { ERROR_MSG } from '../utils/constants';

export const createRoom = (socket) => (dispatch) => {
  if (socket !== null) {
    socket.emit(
      'CREATE_ROOM',
      {
        max_teams: 2,
        max_perTeam: 1,
        max_perRoom: 2,
      },
      (createRoomData) => {
        if (createRoomData !== null) {
          if (createRoomData !== ERROR_MSG) {
            const room_id = createRoomData.config.id;
            socket.off('ROOM_UPDATED').on('ROOM_UPDATED', (data) => {
              if (data !== null && data.type !== undefined) {
                dispatch(getRoom(socket, room_id));
              }
            });
            dispatch({
              type: CREATE_ROOM_SUCCESS,
              payload: createRoomData,
            });
          } else {
            dispatch({ type: CREATE_ROOM_FAIL, payload: createRoomData });
          }
        }
      }
    );
  }
};

export const joinRoom = (socket, room_id) => (dispatch) => {
  if (socket !== null) {
    socket.emit('JOIN_ROOM', { room_id }, (joinRoomData) => {
      if (joinRoomData !== null) {
        if (joinRoomData !== ERROR_MSG) {
          socket.off('ROOM_UPDATED').on('ROOM_UPDATED', (data) => {
            if (data !== null && data.type !== undefined) {
              dispatch(getRoom(socket, room_id));
            }
          });
          dispatch({
            type: JOIN_ROOM_SUCCESS,
            payload: joinRoomData,
          });
        } else {
          dispatch({ type: JOIN_ROOM_FAIL, payload: joinRoomData });
        }
      }
    });
  }
};

export const getRoom = (socket, room_id) => (dispatch) => {
  if (socket !== null) {
    socket.emit('GET_ROOM', { room_id }, (data) => {
      if (data !== null) {
        if (data !== ERROR_MSG && data.error === undefined) {
          dispatch({ type: ROOM_UPDATED, payload: data });
        }
      }
    });
  }
};

export const sendMessage = (socket, message) => (dispatch) => {
  if (socket !== null) {
    socket.emit('SEND_MSG', { content: message }, (data) => {
      console.log('everyone self send', data);
      if (data) {
        dispatch({
          type: CHAT_SUCCESS,
          payload: { message: message, source: 'You' },
        });
      }
    });
  }
};

export const receiveMessage = (socket) => (dispatch) => {
  socket.off('RCV_MSG').on('RCV_MSG', (data) => {
    if (data !== null && data.content !== undefined) {
      dispatch({
        type: CHAT_SUCCESS,
        payload: {
          message: data.content,
          source: data.username,
        },
      });
      console.log('chat data', data);
    }
  });
};
