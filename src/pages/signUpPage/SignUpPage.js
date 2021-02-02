import React, { useEffect, useState } from 'react';
import {
  Center,
  Container,
  Square,
  Stack,
  useToast,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
} from '@chakra-ui/react';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';
import { signUpUser, userActionReset } from '../../actions/userActions';
import { connect } from 'react-redux';
import {
  CONFLICT,
  CREATED,
  MISSING,
  ERROR,
  ERRORTOKEN,
} from '../../utils/constants';
import { useHistory } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = ({ userData, signUpUser, userActionReset }) => {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [authData, setAuthData] = useState({});
  const [sendSignUpRequest, setSendSignUpRequest] = useState(false);
  const history = useHistory();
  const toast = useToast();

  const signUpRequest = (authData) => {
    setAuthData(authData);
    setShowPasswordPrompt(true);
  };

  // Error handling
  useEffect(() => {
    if (
      userData.signUpData.error &&
      userData.signUpData.error.payload !== undefined
    ) {
      switch (userData.signUpData.error.payload.message) {
        case CONFLICT:
          toast({
            title: 'Error on Signup',
            description:
              'You have already registered! Login to use InterviewHut',
            status: 'error',
            duration: 3000,
            isClosable: false,
          });
          history.push('/login');
          userActionReset();
          break;
        case MISSING:
        case ERROR:
        case ERRORTOKEN:
          toast({
            title: 'Error on Signup',
            description: 'Some error occurred, please try again later',
            status: 'error',
            duration: 3000,
            isClosable: false,
          });
          userActionReset();
          break;
        default:
          toast({
            title: 'Error on Signup',
            description: 'Some error occurred, please try again later',
            status: 'error',
            duration: 3000,
            isClosable: false,
          });
          userActionReset();
          break;
      }
    } else if (userData.signUpData.error) {
      toast({
        title: 'Error on Signup',
        description: userData.signUpData.error,
        status: 'error',
        duration: 3000,
        isClosable: false,
      });
      userActionReset();
    }
  }, [userData.signUpData.error, userActionReset, history, toast]);

  useEffect(() => {
    if (userData.signUpData.data) {
      if (userData.signUpData.data.payload.message === CREATED) {
        toast({
          title: 'Registered successfully',
          description:
            'Welcome to InterviewHut! Login to practice for your interviews!',
          status: 'success',
          duration: 3000,
          isClosable: false,
        });
        userActionReset();
        history.push('/login');
      }
    }
  }, [userData.signUpData.data, history, userActionReset, toast]);

  // Make the signup request to API
  useEffect(() => {
    if (sendSignUpRequest) {
      signUpUser(authData);
    }
  }, [sendSignUpRequest, authData, signUpUser]);

  let content = (
    <Container>
      <Container className="frontpage-body">
        <Square bg="#ffffff" paddingX="100px" h="100vh">
          <Center>
            <Stack>
              <center>
                <h1 className="login-header-text">
                  Register to use InterviewHut!
                </h1>
              </center>
              <center>
                <GoogleAuth
                  text="Sign up with Google"
                  getAuthData={signUpRequest}
                />
                <Container
                  style={{ cursor: 'pointer' }}
                  fontSize="16px"
                  onClick={() => {
                    history.push('/login');
                  }}
                >
                  Already a member? Login
                </Container>
              </center>
            </Stack>
          </Center>
        </Square>
      </Container>
    </Container>
  );

  if (showPasswordPrompt) {
    content = (
      <Container>
        <Container className="frontpage-body">
          <Square bg="#ffffff" paddingX="100px" h="100vh">
            <Center>
              <Stack>
                <center>
                  <FormControl id="email">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <FormHelperText>
                      Make sure you give a strong password
                    </FormHelperText>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      onClick={() => {
                        setAuthData((prevState) => ({
                          ...prevState,
                          password: password,
                        }));
                        setSendSignUpRequest(true);
                      }}
                      isLoading={userData.signUpData.isLoading}
                    >
                      Submit
                    </Button>
                  </FormControl>
                </center>
              </Stack>
            </Center>
          </Square>
        </Container>
      </Container>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, { signUpUser, userActionReset })(
  SignUpPage
);
