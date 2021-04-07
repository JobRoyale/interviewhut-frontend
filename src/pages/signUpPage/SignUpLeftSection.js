import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import welcome from '../../assets/welcome.svg';

const SignUpLeftSection = () => {
  return (
    <Flex
      bg="#4C96EB"
      w="50%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Image src={welcome} alt="character" boxSize="250px" />
    </Flex>
  );
};

export default SignUpLeftSection;
