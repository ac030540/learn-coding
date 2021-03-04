import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const ProtectedRoute = ({ children: Component, ...rest }) => {
  const auth = useStoreState((state) => state.auth);
  return (
    <Route
      {...rest}
      render={() => {
        if (auth && auth.uid && auth.emailVerified) {
          // case for verified user
          return Component;
        }
        if (auth && auth.uid && !auth.emailVerified) {
          // case for unverfied user
          return <Redirect to={{ pathname: '/verify' }} />;
        }
        // case for unsigned user
        return <Redirect to={{ pathname: '/signin' }} />;
      }}
    />
  );
};

export default ProtectedRoute;
