import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const AdminProtectedRoute = ({ children: Component, ...rest }) => {
  const auth = useStoreState((state) => state.auth);
  return (
    <Route
      {...rest}
      render={() => {
        if (auth && auth.uid && !auth.emailVerified) {
          // case for unverified user
          return <Redirect to={{ pathname: '/verify' }} />;
        }
        if (auth && auth.uid && !process.env.REACT_APP_ADMINS.includes(auth.email)) {
          // case for user not an admin
          return <Redirect to={{ pathname: '/profile' }} />;
        }
        if (!auth || !auth.uid) {
          // case for unsigned user
          return <Redirect to={{ pathname: '/signin' }} />;
        }
        return Component;
      }}
    />
  );
};

export default AdminProtectedRoute;
