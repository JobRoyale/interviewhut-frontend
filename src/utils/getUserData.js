import jwt from 'jsonwebtoken';

const getUserData = () => {
  const token = localStorage.token;

  // User Data object
  let user;

  // If token found in localStorage decode to get user info
  if (token) {
    user = jwt.decode(token);
    // if (user === null) {
    //   user = jwt.decode(process.env.REACT_APP_FALLBACK_TOKEN);
    // }
  } else {
    user = {
      email: 'interviewhutuser@email.com',
      name: 'InterviewHut User',
      picture: 'https://www.flaticon.com/svg/static/icons/svg/21/21104.svg',
      userName: 'interviewHutUser',
    };
  }

  return user;
};

export default getUserData;
