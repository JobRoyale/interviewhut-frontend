import { Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import Header from '../../components/header/Header';

const FrontPage = () => {
  const history = useHistory();

  return (
    <div>
      <Header loggedIn={false} />
      <Flex
        bg="#4C96EB"
        h="91vh"
        alignItems="center"
        justifyContent="space-between"
        padding="150px"
      >
        <Stack>
          <Text fontSize="3xl" color="white">
            The best way to prepare yourself for cracking those interviews.
          </Text>
          <Button
            width="50%"
            colorScheme="yellow"
            onClick={() => history.push('/signup')}
          >
            Get Started
          </Button>
        </Stack>
        <Image
          boxSize="500px"
          src="images/frontpage_illustration.png"
          alt="mock interview"
        ></Image>
      </Flex>
    </div>
  );
};

export default FrontPage;
