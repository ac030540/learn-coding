import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const useRedirectVerifiedUser = () => {
  const history = useHistory();
  const auth = useStoreState((state) => state.auth);

  useEffect(() => {
    if (auth && auth.emailVerified) {
      // Redirecting the user to profile page if user is Verified
      history.push(`/profile`);
    }
  }, []);
};

export default useRedirectVerifiedUser;
