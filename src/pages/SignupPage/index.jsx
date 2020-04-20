import React from 'react';
import CompactTemplate from 'components/templates/CompactTemplate';
import { Routes, Route, useLocation } from 'react-router-dom';

import useRedirectWhenSignedIn from 'hooks/useRedirectWhenSignedIn';

import SignupForm from 'components/organisms/SignupForm';
import Welcome from 'components/organisms/Welcome';

function SignupPage() {
  const location = useLocation();
  const redirectTo = decodeURIComponent(location?.state ? location.state.redirectTo : '/');

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

export default SignupPage;
