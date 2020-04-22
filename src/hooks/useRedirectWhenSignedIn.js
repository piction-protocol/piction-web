import { useEffect } from 'react';
import useCurrentUser from 'hooks/useCurrentUser';
import { useHistory } from 'react-router-dom';

export default function useRedirectWhenSignedIn(redirectTo = '/') {
  const { accessToken } = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      history.push(redirectTo);
    }
  }, [accessToken, history, redirectTo]);
}
