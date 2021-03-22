import React,{useEffect, useState} from 'react';
import { Box, Container, Flex, Image, Button ,Text, Input} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { connectSocket} from '../../actions/socketActions';
import {createRoom, joinRoom} from "../../actions/roomActions"; 

const DashboardPage = ({connectSocket, createRoom, socketData, joinRoom}) => {

  const socket = socketData.socket;
  const [roomId, setRoomId] = useState("");

  const onClickHandler = () =>{
    console.log("onclick");
    createRoom(socket);
  }

  const joinRoomHandler = (event) => {
    if (event.key === 'Enter') {
      joinRoom(socket, event.target.value);
      setRoomId('');
    }
  };

  useEffect(()=>{
    console.log("dashboard");
    connectSocket();
  },[]);

  return <div>
  <div className="frontpage-header">
    <Box bg="#11143C" w="100%" h="10vh" paddingTop="30px" color="white">
      <Flex paddingX="30px">
        <Container flex="21" fontSize="25px">
          <div>InterviewHut</div>
        </Container>
        <Container flex="2">
          <div>About us</div>
        </Container>
        <Container flex="2">
          <div>Contact us</div>
        </Container>
        <Container flex="1">
          <div>{/* image here */}</div>
        </Container>
      </Flex>
    </Box>
  </div>
  <div className="frontpage-body">
    <Flex bg="#4C96EB" paddingX="100px" h="90vh">
      <Container flex="2" paddingTop="230px">
        <Text fontSize="2xl">
          Choose this option for a custom interview where you can decide who do you want to be interviewed by.
        </Text>
        <Container h="5vh">

        </Container>
        <Button onClick = {onClickHandler}>
           CUSTOM INTERVIEW
        </Button>
        <Input placeholder="Join Room" 
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        onKeyPress={joinRoomHandler}/>
      </Container>


      <Container flex="1" />

      <Container flex="2" paddingTop="230px">
        <Text fontSize="2xl">
          Choose this option for a random interview where you will be assigned to random person who will interview you.
        </Text>
        <Container h="5vh">

        </Container>
        <Button>
          RANDOM INTERVIEW
        </Button>
      </Container>
    </Flex>
  </div>
</div>;
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps, {connectSocket, createRoom, joinRoom})(
  DashboardPage
);
