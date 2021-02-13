import { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import SignIn from './components/auth/SignIn';
import CustomAppBar from './components/common/AppBar';
import CustomSnackbar from './components/common/Snackbar';
import ResetPassword from './components/auth/ResetPassword';
import Homepage from './components/homepage/Homepage';
import Loading from './components/common/Loading';
import './App.css';
import SignUp from './components/auth/SignUp';
import Verify from './components/auth/Verify';
import { auth as firebaseAuth } from './firebase.config';
import Profile from './components/user/profile';
import Settings from './components/user/settings';
import Concepts from './components/admin/viewConcepts/Concepts';
import EditConcepts from './components/admin/editConcepts/EditConcepts';
import CreateConcepts from './components/admin/createConcepts/CreateConcepts';
import Subconcepts from './components/admin/viewSubconcepts/Subconcepts';
import CreateSubconcept from './components/admin/createSubconcept/CreateSubconcept';
import EditSubconcept from './components/admin/editSubconcept/EditSubconcept';

const App = () => {
  const setAuth = useStoreActions((actions) => actions.setAuth);
  const auth = useStoreState((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();

  // This effect automatically updates the auth state when there is change in the firebase auth
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      let uid = null;
      let emailVerified = null;
      let email = null;
      if (user) {
        uid = user.uid;
        emailVerified = user.emailVerified;
        email = user.email;
        // fetching all the user details from database
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/${uid}`, {
          method: 'GET',
        })
          .then((userResponse) => userResponse.json())
          .then((userData) => {
            if (userData.success) {
              setAuth({
                ...auth,
                uid,
                firstName: userData.data.firstName,
                lastName: userData.data.lastName,
                email,
                emailVerified,
              });
              setLoading(false);
            }
          });
      } else {
        setAuth({
          ...auth,
          uid,
          email,
          emailVerified,
        });
        if (location.pathname !== '/reset' && location.pathname !== '/signup') {
          history.push('/signin');
        }
        setLoading(false);
      }
    });
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <>
      <CustomAppBar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
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
        <Route exact path="/settings">
          <Settings />
        </Route>
        <Route exact path="/admin/concepts">
          <Concepts />
        </Route>
        <Route exact path="/admin/concepts/:_id/edit">
          <EditConcepts />
        </Route>
        <Route exact path="/admin/concepts/create">
          <CreateConcepts />
        </Route>
        <Route exact path="/admin/concepts/:conceptId">
          <Subconcepts />
        </Route>
        <Route exact path="/admin/concepts/:conceptId/create">
          <CreateSubconcept />
        </Route>
        <Route exact path="/admin/concepts/:conceptId/subconcepts/:subconceptId/edit">
          <EditSubconcept />
        </Route>
        )
      </Switch>
      <CustomSnackbar />
    </>
  );
};

export default App;
