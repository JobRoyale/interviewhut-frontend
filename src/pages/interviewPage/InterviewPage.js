/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import Peer from 'simple-peer';
import { connect } from 'react-redux';
import { closeRoom, roomClosed } from '../../actions/roomActions';
import getUserData from '../../utils/getUserData';
import {
  Text,
  Button,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import Header from '../../components/header/Header';
import { useHistory } from 'react-router-dom';
import SlateEditor from '../../components/slateEditor/SlateEditor';
import Timer from '../../components/timer/Timer';

const InterviewPage = ({ socketData, roomData, closeRoom, roomClosed }) => {
  const socket = socketData.socket;

  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const [isCloseRoomOpen, setIsCloseRoomOpen] = useState(false);
  const onCloseRoomClose = () => setIsCloseRoomOpen(false);
  const cancelCloseRoomRef = React.useRef();

  // My details
  const myUsername = getUserData().username;
  const [myStream, setMyStream] = useState();

  // Other caller details
  const [callerUsername, setCallerUsername] = useState('');
  const [callerSignal, setCallerSignal] = useState();

  const [receivingCall, setReceivingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef();
  const otherMemberVideo = useRef();
  const connectionRef = useRef();

  if (!socket) {
    history.push('/dashboard');
  }

  if (!roomData.room) {
    history.push('/dashboard');
  }

  useEffect(() => {
    if (socket) {
      roomClosed(socket);
    }
  }, [roomClosed, socket]);

  useEffect(() => {
    if (socket) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setMyStream(stream);
          myVideo.current.srcObject = stream;
        });
      socket.off('callUser').on('callUser', (data) => {
        setReceivingCall(true);
        setCallerUsername(data.from);
        setCallerSignal(data.signal);
        setIsOpen(true);
      });
    }
  }, [socket]);

  const callUser = (username) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream,
    });
    peer.on('signal', (data) => {
      socket.emit('callUser', {
        usernameToCall: username,
        signal: data,
        from: myUsername,
      });
    });
    peer.on('stream', (stream) => {
      otherMemberVideo.current.srcObject = stream;
    });

    socket.off('callAccepted').on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream,
    });
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: callerUsername });
    });

    peer.on('stream', (stream) => {
      otherMemberVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  const handleStartVideoCall = () => {
    if (roomData.room.config.admin === myUsername) {
      for (let team in roomData.room.teams) {
        if (team !== myUsername) {
          callUser(team);
        }
      }
    }
  };

  const handleEndInterview = () => {
    if (socket && connectionRef.current) {
      leaveCall();
      closeRoom(socket);
    } else {
      closeRoom(socket);
    }
  };

  return (
    <div>
      <Header loggedIn={true} />
      <Flex h="91vh" bgColor="#dde5eb">
        <Flex
          height="100%"
          width="80%"
          flexDirection="column"
          bgColor="#dde5eb"
          padding="30px"
        >
          <Flex flexDirection="column" bgColor="white" height="100%">
            <SlateEditor />
          </Flex>
        </Flex>
        <Flex height="100%" width="20%" flexDirection="column">
          <Flex flexDirection="column" padding="10px">
            <Text fontSize="md">Time left for interview</Text>
            <Timer milliseconds="2700000" />
          </Flex>
          <Flex width="100%">
            {myStream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: '100%' }}
              />
            )}
          </Flex>
          {roomData.room ? (
            roomData.room.config.admin === myUsername &&
            !callAccepted &&
            !callEnded ? (
              <Flex
                width="100%"
                padding="5px"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  width="70%"
                  onClick={handleStartVideoCall}
                  colorScheme="blue"
                >
                  Start video call
                </Button>
              </Flex>
            ) : null
          ) : null}
          <Flex>
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={otherMemberVideo}
                autoPlay
                style={{ width: '300px' }}
              />
            ) : null}
          </Flex>
          {roomData.room ? (
            roomData.room.config.admin === myUsername ? (
              <Flex
                width="100%"
                padding="5px"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  width="70%"
                  colorScheme="red"
                  onClick={() => setIsCloseRoomOpen(true)}
                >
                  End Interview
                </Button>
              </Flex>
            ) : null
          ) : null}
          <div>
            {receivingCall && !callAccepted ? (
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Video Call
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      {callerUsername} requested for video access
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button colorScheme="green" onClick={answerCall} ml={3}>
                        Accept
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            ) : null}
          </div>
        </Flex>
        <AlertDialog
          isOpen={isCloseRoomOpen}
          leastDestructiveRef={cancelRef}
          onClose={onCloseRoomClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                End interview and close room
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCloseRoomClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleEndInterview} ml={3}>
                  End Interview
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
    </div>
  );
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, { closeRoom, roomClosed })(
  InterviewPage
);
