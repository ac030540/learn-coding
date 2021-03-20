import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CustomAppBar from './components/common/AppBar';
import CustomSnackbar from './components/common/Snackbar';
import Loading from './components/common/Loading';
import { auth as firebaseAuth } from './firebase.config';
import ScrollToTop from './components/common/ScrollToTop';
import './App.css';
import CustomConfetti from './components/common/Confetti';
import SignUp from './components/auth/SignUp';
import ResetPassword from './components/auth/ResetPassword';
import SignIn from './components/auth/SignIn';
import AuthProtectedRoute from './components/auth/AuthProtectedRoute';
import UserConcepts from './components/concepts/UserConcepts';
import UserSubconcepts from './components/subconcepts/UserSubconcepts';
import Verify from './components/auth/Verify';
import MainPage from './components/mainPage/MainPage';
import Editor from './components/editor/Editor';
import References from './components/references/References';
import Profile from './components/user/profile';
import Settings from './components/user/settings';
import Homepage from './components/homepage/Homepage';
import SubmissionPage from './components/user/SubmissionPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import VerifyProtectedRoute from './components/common/VerifyProtectedRoute';
import Concepts from './components/admin/viewConcepts/Concepts';
import EditConcepts from './components/admin/editConcepts/EditConcepts';
import CreateConcepts from './components/admin/createConcepts/CreateConcepts';
import Subconcepts from './components/admin/viewSubconcepts/Subconcepts';
import EditSubconcept from './components/admin/editSubconcept/EditSubconcept';
import AdminMainPage from './components/admin/Subconcept';
import CreateSubconcept from './components/admin/createSubconcept/CreateSubconcept';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import NoPageFound from './components/common/NoPageFound';

const App = () => {
  const setAuth = useStoreActions((actions) => actions.setAuth);
  const auth = useStoreState((state) => state.auth);
  const showConfetti = useStoreState((state) => state.showConfetti);
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
                id: userData.data._id,
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
      {showConfetti && <CustomConfetti />}
      <Switch>
        <AuthProtectedRoute exact path="/signin">
          <SignIn />
        </AuthProtectedRoute>
        <AuthProtectedRoute exact path="/signup">
          <SignUp />
        </AuthProtectedRoute>
        <AuthProtectedRoute exact path="/reset">
          <ResetPassword />
        </AuthProtectedRoute>
        <ProtectedRoute exact path="/">
          <Homepage />
        </ProtectedRoute>
        <VerifyProtectedRoute exact path="/verify">
          <Verify />
        </VerifyProtectedRoute>
        <ProtectedRoute exact path="/concepts">
          <UserConcepts />
        </ProtectedRoute>
        <ProtectedRoute exact path="/concepts/:conceptId">
          <UserSubconcepts />
        </ProtectedRoute>
        <ProtectedRoute exact path="/subconcepts/:subconceptId">
          <MainPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/editor">
          <Editor />
        </ProtectedRoute>
        <ProtectedRoute exact path="/references">
          <References />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/submission/:submissionId">
          <SubmissionPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/settings">
          <Settings />
        </ProtectedRoute>
        <AdminProtectedRoute exact path="/admin/concepts">
          <Concepts />
        </AdminProtectedRoute>
        <AdminProtectedRoute exact path="/admin/concepts/create">
          <CreateConcepts />
        </AdminProtectedRoute>
        <AdminProtectedRoute exact path="/admin/concepts/:conceptId/edit">
          <EditConcepts />
        </AdminProtectedRoute>
        <AdminProtectedRoute exact path="/admin/concepts/:conceptId/create">
          <CreateSubconcept />
        </AdminProtectedRoute>
        <AdminProtectedRoute exact path="/admin/concepts/:conceptId">
          <Subconcepts />
        </AdminProtectedRoute>
        <AdminProtectedRoute exact path="/admin/subconcepts/:subconceptId">
          <AdminMainPage />
        </AdminProtectedRoute>
        <AdminProtectedRoute exact path="/admin/concepts/:conceptId/subconcepts/:subconceptId/edit">
          <EditSubconcept />
        </AdminProtectedRoute>
        <Route path="*">
          <NoPageFound />
        </Route>
      </Switch>
      <CustomSnackbar />
      <ScrollToTop />
    </>
  );
};

export default App;
