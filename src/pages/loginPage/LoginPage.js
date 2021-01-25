import React from 'react';
import { Center, Container, Square, Stack } from '@chakra-ui/react';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';
import { loginUser, userActionReset } from '../../actions/userActions';
import { connect } from 'react-redux';
import './LoginPage.css';

const LoginPage = ({ userData, loginUser, userActionReset }) => {
  const loginRequest = (authData) => {
    loginUser(authData);
  };

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
