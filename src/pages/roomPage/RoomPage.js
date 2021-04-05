import React, { useEffect } from 'react';
import { Button, Stack, Flex } from '@chakra-ui/react';
import RoomMember from '../../components/roomMember/RoomMember';
import Header from '../../components/header/Header';
import { connect } from 'react-redux';
import {
  startInterview,
  interviewStarted,
} from '../../actions/interviewActions';
import getUserData from '../../utils/getUserData';
import { useHistory } from 'react-router-dom';

const RoomPage = ({
  socketData,
  roomData,
  interviewData,
  startInterview,
  interviewStarted,
}) => {
  const history = useHistory();
  const socket = socketData.socket;
  const username = getUserData().username;

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

  return (
    <Stack height="100vh" width="100%">
      <Header />
      <Stack height="100%" justifyContent="center" alignItems="center">
        <Flex>{roomMemberCards}</Flex>
        {socket ? (
          roomData.room.config.admin === username ? (
            <Button width="20%" onClick={handleStartInterview}>
              Start Interview
            </Button>
          ) : null
        ) : null}
      </Stack>
    </Stack>
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
