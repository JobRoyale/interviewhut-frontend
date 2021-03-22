import {
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAIL,
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
            // Pls forgive me for doing this. No other way!
            socket.emit('CREATE_TEAM', { team_name: 'team1' }, (data) => {
              if (data !== null) {
                if (data !== ERROR_MSG && data.error === undefined) {
                  socket.emit('JOIN_TEAM', { team_name: 'team1' }, (data) => {
                    if (data !== null) {
                      if (data !== ERROR_MSG && data.error === undefined) {
                        socket.emit(
                          'CREATE_TEAM',
                          { team_name: 'team2' },
                          (data) => {
                            if (data !== null) {
                              if (
                                data !== ERROR_MSG &&
                                data.error === undefined
                              ) {
                                dispatch({
                                  type: CREATE_ROOM_SUCCESS,
                                  payload: createRoomData,
                                });
                              }
                            }
                          }
                        );
                      }
                    }
                  });
                }
              }
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
          // Pls forgive me for doing this. No other way!
          socket.emit('JOIN_TEAM', { team_name: 'team2' }, (data) => {
            if (data !== null) {
              if (data !== ERROR_MSG && data.error === undefined) {
                dispatch({
                  type: JOIN_ROOM_SUCCESS,
                  payload: joinRoomData,
                });
              }
            }
          });
        } else {
          dispatch({ type: JOIN_ROOM_FAIL, payload: joinRoomData });
        }
      }
    });
  }
};
