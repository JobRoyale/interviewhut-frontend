import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FrontPage from './pages/frontpage/FrontPage';

function App() {
  return (
    <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={FrontPage}/>
           </Switch>
        </div> 
      </BrowserRouter>
  );
}

export default App;
