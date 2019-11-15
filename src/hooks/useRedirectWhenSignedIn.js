import { useEffect } from 'react';
import useCurrentUser from 'hooks/useCurrentUser';
import { navigate } from '@reach/router';

export default function useRedirectWhenSignedIn(redirectTo = '/') {
  const { accessToken } = useCurrentUser();

  useEffect(() => {
    if (accessToken) {
      navigate(redirectTo);
    }
  }, [accessToken, redirectTo]);
}
