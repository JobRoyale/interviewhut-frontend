import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import loginCharacter from '../../assets/login.svg';

const LoginLeftSection = () => {
  return (
    <Flex
      bg="#4C96EB"
      w="50%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Image src={loginCharacter} alt="character" boxSize="250px" />
    </Flex>
  );
};

export default LoginLeftSection;
