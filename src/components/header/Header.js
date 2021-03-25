import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import ProfileButton from '../profileButton/ProfileButton';

const Header = () => {
  return (
    <Flex
      width="100%"
      bg="#4C96EB"
      padding="18px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text color="white" fontSize="2xl">
        InterviewHut
      </Text>
      <ProfileButton />
    </Flex>
  );
};

export default Header;
