import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const useRedirectUnverifiedUser = () => {
  const history = useHistory();
  const auth = useStoreState((state) => state.auth);

  useEffect(() => {
    if (auth && !auth.emailVerified) {
      // Redirecting the user to verify page if user is unverified
      history.push(`/verify`);
    }
  }, []);
};

export default useRedirectUnverifiedUser;
