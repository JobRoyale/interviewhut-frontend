import React from 'react';
import { Button, Stack, Flex } from '@chakra-ui/react';
import RoomMember from '../../components/roomMember/RoomMember';
import Header from '../../components/header/Header';
import { connect } from 'react-redux';

const RoomPage = ({ socketData, roomData }) => {
  let roomMemberCards = null;
  let roomMembers;

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
  return (
    <Stack height="100vh" width="100%">
      <Header />
      <Stack height="100%" justifyContent="center" alignItems="center">
        <Flex>{roomMemberCards}</Flex>
        <Button width="20%">Start Interview</Button>
      </Stack>
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, {})(RoomPage);
