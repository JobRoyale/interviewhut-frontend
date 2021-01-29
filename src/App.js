import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './store';
import FrontPage from './pages/frontpage/FrontPage';
import LoginPage from './pages/loginPage/LoginPage';
import SignUpPage from './pages/signUpPage/SignUpPage';
import DashboardPage from './pages/dashboardPage/DashboardPage';
import isAuthenticated from './utils/isAuthenticated';

const componentRegistry = {
  FrontPage: FrontPage,
  LoginPage: LoginPage,
  SignUpPage: SignUpPage,
  DashboardPage: DashboardPage,
};

const RenderRoute = (route) => {
  const history = useHistory();
  document.title = route.title || 'InterviewHut';

  if (route.needsAuth && !isAuthenticated()) {
    history.push('/login');
  }

  return (
    <Route
      exact
      path={route.path}
      component={componentRegistry[route.component]}
    />
  );
};

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            {routes.map((route, index) => (
              <RenderRoute {...route} key={index} />
            ))}
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
