import React, { Suspense, useEffect } from 'react';
import { Router } from '@reach/router';

import useCurrentUser from 'hooks/useCurrentUser';

import GlobalHeader from 'components/organisms/GlobalHeader';
import GlobalFooter from 'components/organisms/GlobalFooter';

const HomePage = React.lazy(() => import('pages/HomePage'));
const LoginPage = React.lazy(() => import('pages/LoginPage'));
const SignupPage = React.lazy(() => import('pages/SignupPage'));
const MyPage = React.lazy(() => import('pages/MyPage'));
const WalletPage = React.lazy(() => import('pages/WalletPage'));

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

function App() {
  const { getCurrentUser } = useCurrentUser();
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <div className="root">
      <GlobalHeader />
      <Router>
        <Suspense path="/" fallback={<div>Loading</div>}>
          <HomePage path="/" />
          <LoginPage path="login" />
          <SignupPage path="signup" />
          <MyPage path="my/*" />
          <WalletPage path="wallet" />
          <NotFound default />
        </Suspense>
      </Router>
      <GlobalFooter />
    </div>
  );
}

export default App;
