import React, { useEffect } from 'react';
import { Router } from '@reach/router';

import useCurrentUser from 'hooks/useCurrentUser';

import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';

function App() {
  const { getCurrentUser } = useCurrentUser();
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <Router className="root">
      <HomePage path="/" />
      <LoginPage path="login" />
      <SignupPage path="signup" />
    </Router>
  );
}

export default App;
