import React, { useState, useEffect } from 'react';
import { Flex, Stack, Input, InputGroup } from '@chakra-ui/react';
import RoomChatBubble from '../../components/roomChatBubble/RoomChatBubble';
import { connect } from 'react-redux';
import { sendMessage, receiveMessage } from '../../actions/roomActions';
import getUserData from '../../utils/getUserData';

const RoomChat = ({ socketData, roomData, sendMessage, receiveMessage }) => {
  const socket = socketData.socket;
  const chatMessages = roomData.chatMessageList;

  const user = getUserData();

  const [chatMessage, setChatMessage] = useState('');

  let roomChatCards = null;

  useEffect(() => {
    if (socket) {
      receiveMessage(socket);
    }
  }, [socket, receiveMessage]);

  if (chatMessages) {
    roomChatCards = chatMessages.map((chatMessage, index) => {
      if (chatMessage.source) {
        return (
          <RoomChatBubble
            key={index}
            username={chatMessage.source}
            profilePic={
              chatMessage.source === 'You'
                ? user.profilePic
                : roomData.room.state.profilePictures[chatMessage.source]
            }
            chatMessage={chatMessage.message}
          />
        );
      } else {
        return null;
      }
    });
  }

  // Handle event when user presses enter key
  const handleChatInputKeyPressed = (event) => {
    if (event.key === 'Enter') {
      sendMessage(socket, event.target.value);
      setChatMessage('');
    }
  };

  return (
    <Flex
      as="div"
      pos="relative"
      bg="#fafdff"
      width="30%"
      h="91vh"
      flexDirection="column-reverse"
      paddingLeft="10px"
      paddingRight="10px"
      paddingBottom="10px"
    >
      <Stack marginBottom="50px" overflow="auto">
        {roomChatCards}
      </Stack>
      <InputGroup
        size="md"
        pos="absolute"
        bottom="0"
        left="0"
        borderColor="teal"
        padding="inherit"
      >
        <Input
          pr="4.5rem"
          placeholder="Message"
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          onKeyPress={handleChatInputKeyPressed}
        />
      </InputGroup>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, { sendMessage, receiveMessage })(
  RoomChat
);
