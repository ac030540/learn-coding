import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import './App.css';
import CustomAppBar from './components/common/AppBar';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <CustomAppBar />
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
