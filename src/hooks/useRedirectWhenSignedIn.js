import { useEffect } from 'react';
import useCurrentUser from 'hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';

export default function useRedirectWhenSignedIn(redirectTo = '/') {
  const { accessToken } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate(redirectTo);
    }
  }, [accessToken, navigate, redirectTo]);
}
