import {
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAIL,
  ROOM_UPDATED,
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
            socket.off.on('ROOM_UPDATED', (data) => {
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
          socket.off.on('ROOM_UPDATED', (data) => {
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
