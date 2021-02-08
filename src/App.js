import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import CustomAppBar from './components/common/AppBar';
import CustomSnackbar from './components/common/Snackbar';
import './App.css';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <CustomAppBar />
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
      </Switch>
      <CustomSnackbar />
    </BrowserRouter>
  );
};

export default App;
