import React from 'react';
import PropTypes from 'prop-types';
import CompactTemplate from 'components/templates/CompactTemplate';
import { Router } from '@reach/router';

import useRedirectWhenSignedIn from 'hooks/useRedirectWhenSignedIn';

import SignupForm from 'components/organisms/SignupForm';
import Welcome from 'components/organisms/Welcome';

function SignupPage({ location }) {
  useRedirectWhenSignedIn();

  return (
    <CompactTemplate>
      <Router primary={false} basepath="/signup">
        <SignupForm path="/" />
        <Welcome path="/welcome" {...location.state} />
      </Router>
    </CompactTemplate>
  );
}

SignupPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SignupPage;
