import React from 'react';
import { Button, Stack, Flex } from '@chakra-ui/react';
import RoomMember from '../../components/roomMember/RoomMember';
import Header from '../../components/header/Header';

const RoomPage = () => {
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

export default RoomPage;
