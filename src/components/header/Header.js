import React from 'react';
import { Button, Flex, Text, Link } from '@chakra-ui/react';
import ProfileButton from '../profileButton/ProfileButton';
import { useHistory } from 'react-router-dom';

const Header = (props) => {
  const { loggedIn } = props;

  const history = useHistory();

  let content = (
    <Flex
      height="9vh"
      width="100%"
      bg="white"
      padding="18px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text color="black" fontSize="2xl">
        InterviewHut
      </Text>
      <Flex alignItems="center" justifyContent="center">
        <Link marginRight="10px" onClick={() => history.push('/signup')}>
          Sign up
        </Link>
        <Button
          bg="#4C96EB"
          textColor="white"
          onClick={() => history.push('/login')}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );

  if (loggedIn) {
    content = (
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
  }

  return content;
};

export default Header;
