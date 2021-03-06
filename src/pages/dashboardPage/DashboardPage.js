import React, { useEffect, useState } from 'react';
import {
  Image,
  Flex,
  Button,
  Text,
  Input,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { preCheckUser } from '../../actions/userActions';
import { connectSocket } from '../../actions/socketActions';
import { createRoom, joinRoom } from '../../actions/roomActions';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import interview from '../../assets/interview.svg';

const DashboardPage = ({
  preCheckUser,
  connectSocket,
  createRoom,
  joinRoom,
  socketData,
  roomData,
  userData,
}) => {
  const history = useHistory();
  const socket = socketData.socket;
  const [roomId, setRoomId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCreateRoomHandler = () => {
    createRoom(socket);
  };

  const joinRoomHandler = (event) => {
    if (event.key === 'Enter') {
      joinRoom(socket, event.target.value);
      setRoomId('');
    }
  };

  useEffect(() => {
    preCheckUser(history);
  }, [preCheckUser, history]);

  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  useEffect(() => {
    if (roomData.room) {
      history.push('/room');
    }
  }, [roomData, history]);

  let content = (
    <div>
      <Header loggedIn={true} />
      <Flex bg="#dde5eb" h="91vh" alignItems="center" justifyContent="center">
        <Stack align="center" boxSize="45%" marginRight="50px">
          <Text fontSize="2xl">
            Ace your interviews today! Create a room, invite an interviewer to
            join and conduct a mock interview!
          </Text>
          <Input
            placeholder="Join an interview room with a room code"
            borderColor="#4C96EB"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyPress={joinRoomHandler}
          />
          <Text fontSize="lg">Or</Text>
          <Button onClick={onOpen} colorScheme="blue">
            Create an interview room
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create an interview room</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                By creating a mock interview room you will be able to invite an
                interviewer or friend to join as an interviewer to conduct a
                mock interview.
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onCreateRoomHandler}>
                  Create Room
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
        <Image
          marginLeft="50px"
          boxSize="450px"
          src={interview}
          alt="interview"
        ></Image>
      </Flex>
    </div>
  );

  if (userData.preCheckData.isLoading) {
    <Flex>
      <Spinner color="blue" />
    </Flex>;
  }

  return content;
};

const mapStateToProps = (state) => ({
  userData: state.userData,
  socketData: state.socketData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, {
  preCheckUser,
  connectSocket,
  createRoom,
  joinRoom,
})(DashboardPage);
