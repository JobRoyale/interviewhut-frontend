import io from 'socket.io-client';
import {CONNECTION_FAILED,CONNECTION_ACCEPTED} from '../actions/types';

export const connectSocket = () =>(dispatch)=>{
    const options = {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          },
        },
      };

          let socket = io.connect(ENDPOINT, options);
    socket.on(CONNECTION_ACK, () => {
      console.log(CONNECTION_ACK);
      dispatch({
        type: CONNECTION_ACCEPTED,
        payload: socket
      })
    });
    socket.on(CONNECTION_DENY, (data) => {
      console.log(CONNECTION_DENY);
      dispatch(
        {
          type: CONNECTION_FAILED,
          payload: data,
        }
      )
    });
}