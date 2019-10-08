import React from 'react';
import PropTypes from 'prop-types';
import CompactTemplate from 'components/templates/CompactTemplate';
import { Router } from '@reach/router';

import withLoginChecker from 'components/LoginChecker';

import SignupForm from 'components/organisms/SignupForm';
import Welcome from 'components/organisms/Welcome';

const SignupFormWithLoginChecker = withLoginChecker(SignupForm, false, '/');

function SignupPage({ location }) {
  return (
    <CompactTemplate>
      <Router primary={false} basepath="/signup">
        <SignupFormWithLoginChecker path="/" />
        <Welcome path="/welcome" {...location.state} />
      </Router>
    </CompactTemplate>
  );
}

SignupPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SignupPage;
