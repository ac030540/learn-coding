import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import CustomAppBar from './components/common/AppBar';
import CustomSnackbar from './components/common/Snackbar';
import ResetPassword from './components/Reset/ResetPassword';
import './App.css';
import SignUp from './components/SignUp/SignUp';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <CustomAppBar />
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/reset">
          <ResetPassword />
        </Route>
      </Switch>
      <CustomSnackbar />
    </BrowserRouter>
  );
};

export default App;
