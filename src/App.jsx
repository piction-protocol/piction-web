import React from 'react';
import { StateProvider } from 'context/state';
import { Router } from '@reach/router';

import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';


function App() {
  const initialState = {};

  const reducer = () => {

  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router className="root">
        <HomePage path="/" />
        <LoginPage path="login" />
        <SignupPage path="signup" />
      </Router>
    </StateProvider>
  );
}

export default App;
