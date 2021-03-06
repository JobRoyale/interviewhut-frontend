import React from 'react';
import { Button, Flex, Text, Link } from '@chakra-ui/react';
import ProfileButton from '../profileButton/ProfileButton';
import { useHistory } from 'react-router-dom';
import './Header.css';

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
      boxShadow="0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19)"
    >
      <Text className="interview-heading" color="#4C96EB" fontSize="3xl">
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
        height="9vh"
        width="100%"
        bg="white"
        padding="18px"
        alignItems="center"
        justifyContent="space-between"
        boxShadow="0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19)"
      >
        <Text className="interview-heading" color="#4C96EB" fontSize="3xl">
          InterviewHut
        </Text>
        <ProfileButton />
      </Flex>
    );
  }

  return content;
};

export default Header;
