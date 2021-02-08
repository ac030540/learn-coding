import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import SignIn from './components/SignIn/SignIn';
import './App.css';
import CustomAppBar from './components/common/AppBar';

const App = () => {
  return (
    <StoreProvider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <CustomAppBar />
        <Switch>
          <Route exact path="/signin">
            <SignIn />
          </Route>
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
