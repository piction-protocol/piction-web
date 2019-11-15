import React from 'react';
import PropTypes from 'prop-types';

import useRedirectWhenSignedIn from 'hooks/useRedirectWhenSignedIn';

import CompactTemplate from 'components/templates/CompactTemplate';
import LoginForm from 'components/organisms/LoginForm';

function LoginPage({ location }) {
  useRedirectWhenSignedIn();

  return (
    <CompactTemplate>
      <LoginForm {...location.state} />
    </CompactTemplate>
  );
}

LoginPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LoginPage;
