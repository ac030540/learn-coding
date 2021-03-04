// import { useStoreState, useStoreActions } from 'easy-peasy';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import SignIn from './SignIn';
import AuthProtectedRoute from './AuthProtectedRoute';

const AuthRoutesWrapper = () => {
  // This file includes all the routes that are only accessible before login
  return (
    <>
      <AuthProtectedRoute exact path="/signin">
        <SignIn />
      </AuthProtectedRoute>
      <AuthProtectedRoute exact path="/signup">
        <SignUp />
      </AuthProtectedRoute>
      <AuthProtectedRoute exact path="/reset">
        <ResetPassword />
      </AuthProtectedRoute>
    </>
  );
};

export default AuthRoutesWrapper;
