import React, { useEffect } from 'react';
import { Center, Container, Square, Stack, useToast } from '@chakra-ui/react';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';
import { loginUser, userActionReset } from '../../actions/userActions';
import { connect } from 'react-redux';
import {
  LOGIN,
  REGISTER,
  AUTHERROR,
  ERROR,
  INVALID,
} from '../../utils/constants';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ userData, loginUser, userActionReset }) => {
  const history = useHistory();
  const toast = useToast();

  const loginRequest = (authData) => {
    loginUser(authData);
  };

  // Error handling
  useEffect(() => {
    if (
      userData.loginData.error &&
      userData.loginData.error.payload !== undefined
    ) {
      switch (userData.loginData.error.payload.message) {
        case REGISTER:
          toast({
            title: 'Error on Login',
            description: 'You will have to Sign Up first to use InterviewHut!',
            status: 'error',
            duration: 3000,
            isClosable: false,
          });
          userActionReset();
          break;
        case ERROR:
          toast({
            title: 'Error on Login',
            description: 'Some error occurred, we are working to fix it',
            status: 'error',
            duration: 3000,
            isClosable: false,
          });
          userActionReset();
          break;
        case AUTHERROR:
        case INVALID:
          toast({
            title: 'Error on Login',
            description: 'Some error occurred, please try again later',
            status: 'error',
            duration: 3000,
            isClosable: false,
          });
          userActionReset();
          break;
        default:
          toast({
            title: 'Error on Login',
            description: 'Some error occurred, please try again later',
            status: 'error',
            duration: 3000,
            isClosable: false,
          });
          userActionReset();
          break;
      }
    } else if (userData.loginData.error) {
      toast({
        title: 'Error on Login',
        description: userData.loginData.error,
        status: 'error',
        duration: 3000,
        isClosable: false,
      });
      userActionReset();
    }
  }, [userData.loginData.error, userActionReset, toast]);

  useEffect(() => {
    if (userData.loginData.data) {
      if (userData.loginData.data.payload.message === LOGIN) {
        history.push('/dashboard');
      }
    }
  }, [userData.loginData.data, history, toast]);

  return (
    <Container>
      <Container className="frontpage-body">
        <Square bg="#ffffff" paddingX="100px" h="100vh">
          <Center>
            <Stack>
              <center>
                <h1 className="login-header-text">
                  Login to use InterviewHut!
                </h1>
              </center>
              <center>
                <GoogleAuth
                  text="Login with Google"
                  getAuthData={loginRequest}
                />
                <Container
                  style={{ cursor: 'pointer' }}
                  fontSize="16px"
                  onClick={() => {
                    history.push('/signup');
                  }}
                >
                  New to InterviewHut? Register Now
                </Container>
              </center>
            </Stack>
          </Center>
        </Square>
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, { loginUser, userActionReset })(
  LoginPage
);
