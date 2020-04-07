import { useEffect } from 'react';
import useCurrentUser from 'hooks/useCurrentUser';
import { Navigate as navigate } from 'react-router-dom';

export default function useRedirectWhenSignedIn(redirectTo = '/') {
  const { accessToken } = useCurrentUser();

  useEffect(() => {
    if (accessToken) {
      navigate(redirectTo);
    }
  }, [accessToken, redirectTo]);
}
