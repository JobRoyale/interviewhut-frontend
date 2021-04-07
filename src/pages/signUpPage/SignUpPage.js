import React, { useEffect } from 'react';
import { Flex, useToast } from '@chakra-ui/react';
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
import SignUpLeftSection from './SignUpLeftSection';
import SignUpRightSection from './SignUpRightSection';

const SignUpPage = ({ userData, signUpUser, userActionReset }) => {
  const history = useHistory();
  const toast = useToast();

  // Function for calling action that logs in user
  const sendSignupRequest = (authData) => {
    signUpUser(authData);
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

  return (
    <Flex>
      <SignUpLeftSection />
      <SignUpRightSection
        signUpLoading={userData.signUpData.isLoading}
        sendSignupRequest={sendSignupRequest}
      />
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, { signUpUser, userActionReset })(
  SignUpPage
);
