import { Box, Container, Flex, Image } from '@chakra-ui/react';
import React from 'react';

const frontpage = () => {
  return (
    <Container>
      <Container className="frontpage-header">
        <Box bg="#11143C" w="100%" h="8vh" paddingTop="30px" color="white">
          <Flex paddingX="30px">
            <Container flex="21" fontSize="25px">
              <div>InterviewHut</div>
            </Container>
            <Container flex="2">
              <div>About us</div>
            </Container>
            <Container flex="2">
              <div>Contact us</div>
            </Container>
            <Container flex="1">
              <div>{/* image here */}</div>
            </Container>
          </Flex>
        </Box>
      </Container>
      <Container className="frontpage-body">
        <Flex bg="#4C96EB" paddingX="100px" h="88vh">
          <Container flex="2" paddingTop="230px">
            <Container fontSize="30px" color="white">
              The best way to prepare yourself for cracking those interviews.
            </Container>
            <Container color="#F3CE47" fontSize="30px">
              Get Started.
            </Container>
          </Container>
          <Container flex="1" />
          <Container flex="2" paddingTop="20px">
            <Image
              boxSize="500px"
              objectFit="cover"
              src="images/frontpage_illustration.png"
              alt="error"
            ></Image>
          </Container>
        </Flex>
      </Container>
    </Container>
  );
};

export default frontpage;
