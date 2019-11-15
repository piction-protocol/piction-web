import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';

import Spinner from 'components/atoms/Spinner';
import useCurrentUser from 'hooks/useCurrentUser';

function LoginChecker({ children, redirect }) {
  const { currentUser, accessToken } = useCurrentUser();
  const [isFetchingCurrentUser, setIsFetchingCurrentUser] = useState(true);

  useEffect(() => {
    if (accessToken) return;

    navigate(redirect, {
      state: {
        redirectTo: encodeURIComponent(window.location.pathname + window.location.search),
      },
      replace: true,
    });
  }, [accessToken, redirect]);

  useEffect(() => {
    if (currentUser && accessToken) {
      setIsFetchingCurrentUser(false);
    }
  }, [currentUser, accessToken]);

  if (isFetchingCurrentUser) return <Spinner />;

  return children;
}

const withLoginChecker = (WrappedComponent, redirect = '/login') => (
  props => (
    <LoginChecker redirect={redirect}>
      <WrappedComponent {...props} />
    </LoginChecker>
  )
);

export default withLoginChecker;
