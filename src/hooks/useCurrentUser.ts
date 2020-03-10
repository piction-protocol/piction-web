import { useContext, useCallback } from 'react';
import { navigate } from '@reach/router';

import DefaultPicture from 'images/img-user-profile.svg';

import { CurrentUserContext } from 'context/CurrentUserContext';
import useAuth from './useAuth';

function useCurrentUser() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const auth = useAuth();

  const accessToken = auth.token.get();
  const getCurrentUser = useCallback(async () => {
    try {
      const { data } = await auth.user.me();
      setCurrentUser({
        ...data,
        picture: data.picture || DefaultPicture,
      });
    } catch (error) {
      setCurrentUser(undefined);
      auth.token.delete();
    }
    // eslint-disable-next-line
  }, [accessToken, setCurrentUser]);

  const deleteSession = useCallback(async () => {
    try {
      // Side effect
      navigate('/');
      await auth.session.delete();
    } finally {
      auth.token.delete();
      window.location.reload();
    }
  }, [auth]);

  return {
    currentUser,
    accessToken,
    getCurrentUser,
    deleteSession,
  };
}

export default useCurrentUser;
