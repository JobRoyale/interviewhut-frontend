import React, { useEffect } from 'react';
import { Center, Container, Square, Stack } from '@chakra-ui/react';
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
import { useToast } from '@chakra-ui/react';
import './LoginPage.css';

const LoginPage = ({ userData, loginUser, userActionReset }) => {
  const history = useHistory();
  const toast = useToast();

  const loginRequest = (authData) => {
    loginUser(authData);
  };

  const alert = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: false,
    });
  };

  // Error handling
  useEffect(() => {
    if (
      userData.loginData.error &&
      userData.loginData.error.payload !== undefined
    ) {
      switch (userData.loginData.error.payload.message) {
        case REGISTER:
          alert(
            'Error on Login',
            'You will have to Sign Up first to use InterviewHut!',
            'error'
          );
          userActionReset();
          break;
        case ERROR:
          alert(
            'Error on Login',
            'Some error occurred, we are working to fix it',
            'error'
          );
          userActionReset();
          break;
        case AUTHERROR:
        case INVALID:
          alert(
            'Error on Login',
            'Some error occurred, please try again later',
            'error'
          );
          userActionReset();
          break;
        default:
          alert(
            'Error on Login',
            'Some error occurred, please try again later',
            'error'
          );
          userActionReset();
          break;
      }
    } else if (userData.loginData.error) {
      alert('Error on Login', userData.loginData.error, 'error');
      userActionReset();
    }
  }, [userData.loginData.error, userActionReset]);

  useEffect(() => {
    if (userData.loginData.data) {
      if (userData.loginData.data === LOGIN) {
        history.push('/');
      }
    }
  }, [userData.loginData.data, history]);

  return (
    <Container>
      <Container className="frontpage-body">
        <Square bg="#4C96EB" paddingX="100px" h="100vh">
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
