import React, { useEffect } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Button,
  Text,
  Flex,
  Image,
} from '@chakra-ui/react';
import getUserData from '../../utils/getUserData';
import { connect } from 'react-redux';
import { logoutUser, userActionReset } from '../../actions/userActions';
import { useHistory } from 'react-router-dom';
import { LOGOUT } from '../../utils/constants';

const ProfileButton = ({ userData, logoutUser, userActionReset }) => {
  const history = useHistory();
  const user = getUserData();
  const fullname = `${user.firstname} ${user.lastname}`;

  // When logout is successfull
  useEffect(() => {
    if (userData.logoutData.data) {
      if (userData.logoutData.data.payload.message === LOGOUT) {
        userActionReset();
        localStorage.removeItem('token');
        history.push('/');
      }
    }
  }, [userData.logoutData.data, userActionReset, history]);

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          cursor="pointer"
          borderRadius="full"
          boxSize="45px"
          src={user.profilePic}
          alt={user.username}
        ></Image>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader fontWeight="semibold" fontSize="lg">
          {fullname}
          <Text fontSize="sm">{user.email}</Text>
        </PopoverHeader>
        <PopoverBody>
          <Flex>
            <Text>Logged in as</Text>
            <Text marginLeft="5px" fontWeight="bold">
              {user.username}
            </Text>
          </Flex>
          <Button
            colorScheme="red"
            variant="ghost"
            w="100%"
            onClick={() => logoutUser(history)}
          >
            Logout
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, { logoutUser, userActionReset })(
  ProfileButton
);
