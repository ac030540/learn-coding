import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const AuthProtectedRoute = ({ children: Component, ...rest }) => {
  const auth = useStoreState((state) => state.auth);
  return (
    <Route
      {...rest}
      render={() => {
        if (auth && auth.uid) {
          // if user is present then redirect
          return <Redirect to={{ pathname: '/profile' }} />;
        }
        return Component;
      }}
    />
  );
};

export default AuthProtectedRoute;
