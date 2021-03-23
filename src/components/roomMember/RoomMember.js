import React from 'react';
import { Stack, Avatar, Text } from '@chakra-ui/react';

const RoomMember = ({ roomMemberName, roomMemberAvatar }) => {
  return (
    <Stack alignItems="center" justifyContent="center" margin="22px">
      <Avatar size="2xl" name={roomMemberName} src={roomMemberAvatar} />
      <Text>{roomMemberName}</Text>
    </Stack>
  );
};

export default RoomMember;
