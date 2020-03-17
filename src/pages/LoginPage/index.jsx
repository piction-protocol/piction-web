import React from 'react';
import PropTypes from 'prop-types';

import useRedirectWhenSignedIn from 'hooks/useRedirectWhenSignedIn';

import CompactTemplate from 'components/templates/CompactTemplate';
import LoginForm from 'components/organisms/LoginForm';

function LoginPage({ location }) {
  const redirectTo = decodeURIComponent(location?.state?.redirectTo ? location.state.redirectTo : '/');

  useRedirectWhenSignedIn(redirectTo);

  return (
    <CompactTemplate>
      <LoginForm redirectTo={redirectTo} />
    </CompactTemplate>
  );
}

LoginPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LoginPage;
