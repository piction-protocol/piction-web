import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';

import useCurrentUser from 'hooks/useCurrentUser';

import GlobalHeader from 'components/organisms/GlobalHeader';
import GlobalFooter from 'components/organisms/GlobalFooter';

import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import MyPage from 'pages/MyPage';

const NotFound = () => (
  <div style={{
    margin: 'auto',
    fontSize: '54px',
    fontWeight: 'bold',
  }}
  >
    404
  </div>
);

const StyledRouter = styled(Router)`
  display: flex;
  flex: 1;
`;

function App() {
  const { getCurrentUser } = useCurrentUser();
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <div className="root">
      <GlobalHeader />
      <StyledRouter>
        <HomePage path="/" />
        <LoginPage path="login" />
        <SignupPage path="signup" />
        <MyPage path="my/*" />
        <NotFound default />
      </StyledRouter>
      <GlobalFooter />
    </div>
  );
}

export default App;
