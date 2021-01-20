import { Box, Container, Flex, Image} from '@chakra-ui/react'
import React from 'react'

function frontpage() {
    return (
        <Container>
            <Container className='frontpage-header'>
                <Box bg="#4C96EB" w="100%" h="50px" paddingTop="20px" color="white">
                    <Flex paddingX="30px">
                        <Container flex="15" fontSize="25px">
                            <div>
                                InterviewHut
                            </div>
                        </Container>
                        <Container flex="2">
                            <div>
                                About us
                            </div>
                        </Container>
                        <Container flex="2">
                            <div>
                                Contact us
                            </div>
                        </Container>
                        <Container flex="1">
                            <div>
                                <Image
                                borderRadius="full"
                                boxSize="40px"
                                srcSet="images/profilepic.jpg"
                                alt="error"/>
                            </div>
                        </Container>
                        
                    </Flex>
                </Box>
            </Container>
            <Container className='frontpage-body' height="100%">
                <Flex bg="#4C96EB" paddingX="100px">
                    <Container flex="2" paddingTop="250px">
                        <Container fontSize="30px" color="white">
                            The best way to prepare yourself for cracking those interviews.
                        </Container>
                        <Container color="#F3CE47" fontSize="30px">
                            Get Started.
                        </Container>
                    </Container>
                    <Container flex="1"/>
                    <Container flex="2" paddingTop="50px">
                        <Image
                        boxSize="500px"
                        objectFit="cover"
                        src="images/frontpage_illustration.png"
                        alt="error">
                        </Image>
                    </Container>

                </Flex>
            </Container>
        </Container>
    )
}

export default frontpage
