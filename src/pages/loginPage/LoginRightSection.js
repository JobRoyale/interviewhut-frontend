import React from 'react';
import { Flex, Link, Stack, Text, Spinner } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';

const LoginRightSection = (props) => {
  const history = useHistory();
  // Function that's called once Auth component passes authData
  const getAuthData = (authData) => {
    props.sendLoginRequest(authData);
  };

  // Default content
  let content = (
    <Flex
      bg="white"
      w="50%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack align="center">
        <Flex alignItems="center">
          <Text fontSize="4xl" fontWeight="bold" color="#4C96EB">
            InterviewHut
          </Text>
        </Flex>
        <Text fontSize="2xl">Login to InterviewHut</Text>
        <GoogleAuth text="Login with Google" getAuthData={getAuthData} />
        <Text fontSize="sm">
          Not a InterviewHut user yet?{' '}
          <Link onClick={() => history.push('/signup')}>Sign up now!</Link>
        </Text>
      </Stack>
    </Flex>
  );

  // Loading indicator once request sent to server for login
  if (props.loginLoading) {
    content = (
      <Flex
        bg="white"
        w="50%"
        h="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Stack align="center">
          <Spinner color="#4C96EB" />
          <Text fontSize="md">Logging you in!</Text>
        </Stack>
      </Flex>
    );
  }

  return content;
};

export default LoginRightSection;
