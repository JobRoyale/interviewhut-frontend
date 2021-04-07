import React from 'react';
import { Flex, Avatar, Text, Stack } from '@chakra-ui/react';

const RoomChatBubble = ({ username, profilePic, chatMessage }) => {
  return (
    <Flex
      alignItems="center"
      marginTop="16px"
      _hover={{ bg: '#e3e6e8' }}
      transition="0.3s"
    >
      <Avatar src={profilePic} size="sm" cursor="pointer" />
      <Stack marginLeft="13px">
        <Flex>
          <Text fontSize="sm" fontWeight="bold">
            {username}
          </Text>
        </Flex>
        <Text fontSize="sm">{chatMessage}</Text>
      </Stack>
    </Flex>
  );
};

export default RoomChatBubble;
