import React from 'react';
import CompactTemplate from 'components/templates/CompactTemplate';
import { Router } from '@reach/router';

import withLoginChecker from 'components/LoginChecker';

import SignupForm from 'components/organisms/SignupForm';
import Welcome from 'components/organisms/Welcome';

const SignupFormWithLoginChecker = withLoginChecker(SignupForm, false, '/');

function SignupPage() {
  return (
    <CompactTemplate>
      <Router primary={false} basepath="/signup">
        <SignupFormWithLoginChecker path="/" />
        <Welcome path="/welcome" />
      </Router>
    </CompactTemplate>
  );
}

export default SignupPage;
