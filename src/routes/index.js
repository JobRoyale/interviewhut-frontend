const routes = [
  {
    path: '/login',
    component: 'LoginPage',
    title: 'Login | InterviewHut',
    needsAuth: false,
  },
  {
    path: '/signup',
    component: 'SignUpPage',
    title: 'Sign Up | InterviewHut',
    needsAuth: false,
  },
  {
    path: '/',
    component: 'FrontPage',
    title: 'InterviewHut',
    needsAuth: false,
  },
];

export default routes;
