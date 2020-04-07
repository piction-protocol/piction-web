import React from 'react';
import PropTypes from 'prop-types';
import CompactTemplate from 'components/templates/CompactTemplate';
import { Routes, Route } from 'react-router-dom';

import useRedirectWhenSignedIn from 'hooks/useRedirectWhenSignedIn';

import SignupForm from 'components/organisms/SignupForm';
import Welcome from 'components/organisms/Welcome';

function SignupPage({ location }) {
  const redirectTo = decodeURIComponent(location.state ? location.state.redirectTo : '/');

  useRedirectWhenSignedIn(redirectTo);

  return (
    <CompactTemplate>
      <Routes basepath="/signup">
        <Route path="/" element={<SignupForm />} />
        <Route path="/welcome" element={<Welcome redirectTo={redirectTo} />} />
      </Routes>
    </CompactTemplate>
  );
}

SignupPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SignupPage;
