import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import SignIn from './components/auth/SignIn';
import CustomAppBar from './components/common/AppBar';
import CustomSnackbar from './components/common/Snackbar';
import ResetPassword from './components/auth/ResetPassword';
import Loading from './components/common/Loading';
import './App.css';
import SignUp from './components/auth/SignUp';
import Verify from './components/auth/Verify';
import { auth as firebaseAuth } from './firebase.config';
import Profile from './components/user/profile';

const App = () => {
  const setAuth = useStoreActions((actions) => actions.setAuth);
  const auth = useStoreState((state) => state.auth);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <CustomAppBar />
      <Switch>
        <Route exact path="/verify">
          <Verify />
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
        <Route exact path="/profile">
          <Profile />
        </Route>
        )
      </Switch>
      <CustomSnackbar />
    </BrowserRouter>
  );
};

export default App;
