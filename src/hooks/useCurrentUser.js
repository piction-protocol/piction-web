import { useContext, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import DefaultPicture from 'images/img-user-profile.svg';

import { CurrentUserContext } from 'context/CurrentUserContext';

function useCurrentUser() {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const getCurrentUser = useCallback(async () => {
    try {
      const { data } = await axios.get('http://api-iro.piction.network/users/me', {
        headers: {
          'X-Auth-Token': accessToken,
        },
      });
      setCurrentUser({
        ...data,
        picture: data.picture || DefaultPicture,
      });
    } catch (error) {
      setCurrentUser(null);
      removeCookie('access_token');
    }
  }, [accessToken, removeCookie, setCurrentUser]);

  const deleteSession = useCallback(async () => {
    await axios.delete('http://api-iro.piction.network/sessions', {
      headers: {
        'X-Auth-Token': accessToken,
      },
    });
    setCurrentUser(null);
    removeCookie('access_token');
  }, [accessToken, removeCookie, setCurrentUser]);

  const setAccessToken = (token, options = {}) => {
    setCookie('access_token', token, {
      path: '/',
      ...options,
    });
  };

  return {
    currentUser,
    getCurrentUser,
    deleteSession,
    accessToken,
    setAccessToken,
  };
}

export default useCurrentUser;
