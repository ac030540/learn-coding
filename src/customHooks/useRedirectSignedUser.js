import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const useRedirectSignedUser = () => {
  const history = useHistory();
  const auth = useStoreState((state) => state.auth);

  useEffect(() => {
    if (auth && auth.uid) {
      // Redirecting the user to profile page if user exists
      history.push(`/profile`);
    }
  }, []);
};

export default useRedirectSignedUser;
