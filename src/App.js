import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import FrontPage from './pages/frontpage/FrontPage';
import LoginPage from './pages/loginPage/LoginPage';
import SignUpPage from './pages/signUpPage/SignUpPage';

const componentRegistry = {
  FrontPage: FrontPage,
  LoginPage: LoginPage,
  SignUpPage: SignUpPage,
};

const RenderRoute = (route) => {
  document.title = route.title || 'InterviewHut';

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
    <div className="App">
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RenderRoute {...route} key={index} />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
