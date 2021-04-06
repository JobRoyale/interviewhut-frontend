import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import RoomMember from '../../components/roomMember/RoomMember';
import Header from '../../components/header/Header';
import { connect } from 'react-redux';
import {
  startInterview,
  interviewStarted,
} from '../../actions/interviewActions';
import getUserData from '../../utils/getUserData';
import { useHistory } from 'react-router-dom';
import RoomChat from './RoomChat';

const RoomPage = ({
  socketData,
  roomData,
  interviewData,
  startInterview,
  interviewStarted,
}) => {
  const [copied, setCopied] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const socket = socketData.socket;
  const username = getUserData().username;
  const roomId = roomData.room.config.id;

  let roomMemberCards = null;
  let roomMembers;

  if (!socket) {
    history.push('/dashboard');
  }

  useEffect(() => {
    if (socket) {
      interviewStarted(socket);
    }
    /* eslint-disable */
  }, []);

  useEffect(() => {
    if (interviewData.interview) {
      history.push('/interview');
    }
  }, [history, interviewData]);

  if (roomData.room) {
    roomMembers = roomData.room.teams;
  }

  if (roomMembers) {
    roomMemberCards = Object.keys(roomMembers).map((member, index) => {
      return (
        <RoomMember
          key={index}
          roomMemberName={member}
          roomMemberAvatar={roomData.room.state.profilePictures[member]}
        />
      );
    });
  }

  const handleStartInterview = () => {
    startInterview(socket);
  };

  const handleCopyRoomIdClick = () => {
    // Copying roomCode to clipboard
    navigator.clipboard.writeText(roomId);
    setCopied(true);

    // Stop showing copied tooltip after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <Header loggedIn={true} />
      <Flex
        bgColor="#dde5eb"
        height="91vh"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          flexDirection="column"
          width="70%"
          justifyContent="center"
          alignItems="center"
        >
          <Flex>{roomMemberCards}</Flex>
          {socket ? (
            roomData.room.config.admin === username ? (
              <Stack width="100%" justifyContent="center" alignItems="center">
                <Button width="40%" colorScheme="blue" onClick={onOpen}>
                  Get Room Code
                </Button>
                <Button
                  width="40%"
                  colorScheme="red"
                  onClick={handleStartInterview}
                >
                  Start Interview
                </Button>
              </Stack>
            ) : null
          ) : null}
        </Flex>
        <RoomChat />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Invite other participant with room code</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputGroup size="md">
                <Input pr="4.5rem" value={roomId} readOnly />
                <InputRightElement width="4.5rem">
                  <Tooltip
                    label="Copied"
                    aria-label="A tooltip"
                    isOpen={copied}
                  >
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleCopyRoomIdClick}
                    >
                      Copy
                    </Button>
                  </Tooltip>
                </InputRightElement>
              </InputGroup>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </div>
  );
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  roomData: state.roomData,
  interviewData: state.interviewData,
});

export default connect(mapStateToProps, { startInterview, interviewStarted })(
  RoomPage
);
