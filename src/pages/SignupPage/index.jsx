import React from 'react';
import CompactTemplate from 'components/templates/CompactTemplate';
import { Router } from '@reach/router';

import withLoginChecker from 'components/LoginChecker';

import SignupForm from 'components/organisms/SignupForm';
import Welcome from 'components/organisms/Welcome';

function SignupPage() {
  return (
    <CompactTemplate>
      <Router primary={false} basepath="/signup">
        <SignupForm path="/" />
        <Welcome path="/welcome" />
      </Router>
    </CompactTemplate>
  );
}

export default withLoginChecker(SignupPage, false, '/');
