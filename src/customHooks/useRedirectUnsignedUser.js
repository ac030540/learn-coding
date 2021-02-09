import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const useRedirectUnsignedUser = () => {
  const history = useHistory();
  const auth = useStoreState((state) => state.auth);

  useEffect(() => {
    if (!auth || !auth.uid) {
      // Redirecting the user to signin page if user does not exists
      history.push(`/signin`);
    }
  }, []);
};

export default useRedirectUnsignedUser;
