import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const VerifyProtectedRoute = ({ children: Component, ...rest }) => {
  const auth = useStoreState((state) => state.auth);
  return (
    <Route
      {...rest}
      render={() => {
        if (auth && auth.emailVerified) {
          // case for verified user
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

export default VerifyProtectedRoute;
