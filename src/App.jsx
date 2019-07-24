import React, { Suspense, useState, useEffect } from 'react';
import { Router, Redirect } from '@reach/router';
import styled from 'styled-components';
import { importMDX } from 'mdx.macro';

import useCurrentUser from 'hooks/useCurrentUser';

import GlobalHeader from 'components/organisms/GlobalHeader';
import GlobalFooter from 'components/organisms/GlobalFooter';
import Spinner from 'components/atoms/Spinner';

import TermsComponents from 'components/templates/TermsComponents';

const HomePage = React.lazy(() => import('pages/HomePage'));
const LoginPage = React.lazy(() => import('pages/LoginPage'));
const SignupPage = React.lazy(() => import('pages/SignupPage'));
const SubscriptionsPage = React.lazy(() => import('pages/SubscriptionsPage'));
const ProjectPage = React.lazy(() => import('pages/ProjectPage'));
const PostPage = React.lazy(() => import('pages/PostPage'));
const MembershipPage = React.lazy(() => import('pages/MembershipPage'));
const MyPage = React.lazy(() => import('pages/MyPage'));
const Dashboard = React.lazy(() => import('pages/Dashboard'));

const Terms = React.lazy(() => importMDX('pages/Terms.mdx'));
const Privacy = React.lazy(() => importMDX('pages/Privacy.mdx'));

const StyledRouter = styled(Router)`
  display: flex;
  flex: 1;
`;

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
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(false);
    async function loading() {
      try {
        await getCurrentUser();
      } finally {
        setIsLoaded(true);
      }
    }

    loading();
  }, [getCurrentUser]);

  return (
    <div className="root">
      {isLoaded && (
        <>
          <GlobalHeader />
          <Suspense fallback={<Spinner />}>
            <StyledRouter primary={false}>
              <HomePage path="/" />
              <LoginPage path="login" />
              <SignupPage path="signup/*" />

              <SubscriptionsPage path="subscriptions" />

              <ProjectPage path="project/:projectId/*" />
              <PostPage path="project/:projectId/posts/:postId" />
              <MembershipPage path="project/:projectId/memberships/" />

              <MyPage path="my/*" />
              <Dashboard path="dashboard/*" />

              <Terms components={TermsComponents} path="terms" />
              <Privacy components={TermsComponents} path="privacy" />

              <Redirect from="/en" to="/" noThrow />
              <Redirect from="/ko" to="/" noThrow />

              <NotFound default />
            </StyledRouter>
          </Suspense>
          <GlobalFooter />
        </>
      )}
    </div>
  );
}

export default App;
