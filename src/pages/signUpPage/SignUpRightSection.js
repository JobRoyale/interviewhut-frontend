import React, { useState, useEffect } from 'react';
import {
  Flex,
  Stack,
  Text,
  Link,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Spinner,
} from '@chakra-ui/react';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';
import { useHistory } from 'react-router-dom';

const SignUpRightSection = (props) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [authData, setAuthData] = useState({});
  const [sendSignUpRequest, setSendSignUpRequest] = useState(false);
  const history = useHistory();

  const getAuthData = (authData) => {
    setAuthData(authData);
    setShowPasswordPrompt(true);
  };

  const handleSignupClick = () => {
    setAuthData((prevState) => ({
      ...prevState,
      password: password,
    }));
    setSendSignUpRequest(true);
  };

  useEffect(() => {
    if (sendSignUpRequest) {
      props.sendSignupRequest(authData);
      setSendSignUpRequest(false);
    }
  }, [sendSignUpRequest, authData, props]);

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
        <Text fontSize="2xl">Sign up for InterviewHut</Text>
        <GoogleAuth text="Sign up with Google" getAuthData={getAuthData} />
        <Text fontSize="sm">
          Already have a account{' '}
          <Link onClick={() => history.push('/login')}>Login now!</Link>
        </Text>
      </Stack>
    </Flex>
  );

  if (showPasswordPrompt) {
    content = (
      <Flex
        bg="white"
        w="50%"
        h="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Stack align="center">
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="teal" onClick={handleSignupClick}>
            Sign up
          </Button>
        </Stack>
      </Flex>
    );
  }

  if (props.signUpLoading) {
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
          <Text fontSize="md">Signing you up!</Text>
        </Stack>
      </Flex>
    );
  }

  return content;
};

export default SignUpRightSection;
