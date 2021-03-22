import React from 'react';
import { Button, Stack, Flex } from '@chakra-ui/react';
import RoomMember from '../../components/roomMember/RoomMember';
import Header from '../../components/header/Header';
import { connect } from 'react-redux';

const RoomPage = ({ socketData, roomData }) => {
  return (
    <Stack height="100vh" width="100%">
      <Header />
      <Stack height="100%" justifyContent="center" alignItems="center">
        <Flex>
          <RoomMember roomMemberName="chiragbabulani" />
          <RoomMember roomMemberName="alanHenry" />
        </Flex>
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
