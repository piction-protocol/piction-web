import React, { useContext, useEffect } from 'react';
import { navigate } from '@reach/router';

import { CurrentUserContext } from 'context/CurrentUserContext';

import Spinner from 'components/atoms/Spinner';

function LoginChecker({ bool, children, redirect }) {
  const [currentUser] = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser === bool) {
      navigate(redirect);
    }
  }, [redirect, bool, currentUser]);

  if (!currentUser === bool) {
    return (
      <Spinner />
    );
  }

  return children;
}

const withLoginChecker = (WrappedComponent, bool = true, redirect = '/login') => (
  props => (
    <LoginChecker bool={bool} redirect={redirect}>
      <WrappedComponent {...props} />
    </LoginChecker>
  )
);

export default withLoginChecker;
