export const createRoom = (
    socket,
  ) => {
    console.log("roomACtion");
    return (dispatch) => {
      if (socket !== null) {
        socket.emit(
          'CREATE_ROOM',
          {
            max_teams: 2,
            max_perTeam: 1,
            max_perRoom: 2,
          },
          (data) => { 
            console.log('Create Room', data);
          }
        );
      }
    };
  };