import React, { useEffect } from 'react';
import { Router } from '@reach/router';

import { CurrentUserProvider } from 'context/CurrentUserContext';

import useCurrentUser from 'hooks/useCurrentUser';

import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';

function UserGetter() {
  const { getUser } = useCurrentUser();
  useEffect(() => {
    const token = sessionStorage.getItem('access-token');
    if (token) getUser(token);
    // FIXME: useEffect 코드 개선
    // eslint-disable-next-line
  }, []);
  return null;
}

function App() {
  return (
    <CurrentUserProvider>
      <UserGetter />
      <Router className="root">
        <HomePage path="/" />
        <LoginPage path="login" />
        <SignupPage path="signup" />
      </Router>
    </CurrentUserProvider>
  );
}

export default App;
