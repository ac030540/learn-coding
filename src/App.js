import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import AuthRoutesWrapper from './components/auth/AuthRoutesWrapper';
import CustomAppBar from './components/common/AppBar';
import CustomSnackbar from './components/common/Snackbar';
import Loading from './components/common/Loading';
import { auth as firebaseAuth } from './firebase.config';
import ScrollToTop from './components/common/ScrollToTop';
import UserRoutesWrapper from './components/common/UserRoutesWrapper';
import AdminRoutesWrapper from './components/admin/AdminRoutesWrapper';
import './App.css';

const App = () => {
  const setAuth = useStoreActions((actions) => actions.setAuth);
  const auth = useStoreState((state) => state.auth);
  const [loading, setLoading] = useState(true);

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
        // user not present
        setAuth({
          ...auth,
          uid,
          email,
          emailVerified,
        });
        setLoading(false);
      }
    });
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <>
      <CustomAppBar />
      <AuthRoutesWrapper />
      <UserRoutesWrapper />
      <AdminRoutesWrapper />
      <CustomSnackbar />
      <ScrollToTop />
    </>
  );
};

export default App;
