import { useContext } from 'react';
import axios from 'axios';

import { CurrentUserContext } from 'context/CurrentUserContext';

function useCurrentUser() {
  const [state, setState] = useContext(CurrentUserContext);

  const getUser = async (token) => {
    await axios.get('http://api-iro.piction.network/users/me', {
      headers: {
        'X-Auth-Token': token,
      },
    }).then((result) => {
      setState(prevState => ({ ...prevState, currentUser: result.data.user }));
    }).catch((error) => {
      sessionStorage.removeItem('access-token');
      console.log(error);
    });
  };

  const logout = () => {
    sessionStorage.removeItem('access-token');
    setState(prevState => ({ ...prevState, currentUser: null }));
  };

  return {
    currentUser: state.currentUser,
    getUser,
    logout,
  };
}

export default useCurrentUser;
