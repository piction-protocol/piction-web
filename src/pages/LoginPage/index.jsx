import React from 'react';
import PropTypes from 'prop-types';

import CompactTemplate from 'components/templates/CompactTemplate';
import LoginForm from 'components/organisms/LoginForm';

function LoginPage({ location }) {
  return (
    <CompactTemplate>
      <LoginForm redirectTo={decodeURIComponent(location.state.redirectTo)} />
    </CompactTemplate>
  );
}

LoginPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LoginPage;
