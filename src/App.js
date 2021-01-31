import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FrontPage from './pages/frontpage/FrontPage';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <div>
          <Switch>
            <Route path="/" component={FrontPage}/>
          </Switch>
        </div>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
