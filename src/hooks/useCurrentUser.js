import { useContext, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import { CurrentUserContext } from 'context/CurrentUserContext';

function useCurrentUser() {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const getCurrentUser = useCallback(async () => {
    const { data } = await axios.get('http://api-iro.piction.network/users/me', {
      headers: {
        'X-Auth-Token': accessToken,
      },
    });
    try {
      setCurrentUser({ ...data });
    } catch (error) {
      removeCookie('access_token');
    }
  }, [accessToken, removeCookie, setCurrentUser]);

  const logout = () => {
    removeCookie('access_token');
    setCurrentUser({});
  };

  const setAccessToken = (token) => {
    setCookie('access_token', token);
  };

  return {
    currentUser,
    getCurrentUser,
    logout,
    accessToken,
    setAccessToken,
  };
}

export default useCurrentUser;
