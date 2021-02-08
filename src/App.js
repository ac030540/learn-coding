import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import SignIn from './components/SignIn/SignIn';
import CustomAppBar from './components/common/AppBar';
import CustomSnackbar from './components/common/Snackbar';
import ResetPassword from './components/Reset/ResetPassword';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import { auth as firebaseAuth } from './firebase.config';

const App = () => {
  const setAuth = useStoreActions((actions) => actions.setAuth);
  const auth = useStoreState((state) => state.auth);

  // initialising the global auth state
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      let uid = null;
      let emailVerified = null;
      let email = null;
      if (user) {
        uid = user.uid;
        emailVerified = user.emailVerified;
        email = user.email;
      }
      setAuth({
        ...auth,
        uid,
        email,
        emailVerified,
      });
    });
  }, []);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <CustomAppBar />
      <Switch>
        <Route exact path="/verify">
          <SignIn />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/reset">
          <ResetPassword />
        </Route>
        )
      </Switch>
      <CustomSnackbar />
    </BrowserRouter>
  );
};

export default App;
