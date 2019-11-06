import React, { Suspense, useState, useEffect } from 'react';
import { Router, Redirect } from '@reach/router';
import styled from 'styled-components';
import { importMDX } from 'mdx.macro';

import useCurrentUser from 'hooks/useCurrentUser';

import { LayoutProvider } from 'context/LayoutContext';

import GlobalHeader from 'components/organisms/GlobalHeader';
import GlobalFooter from 'components/organisms/GlobalFooter';
import Spinner from 'components/atoms/Spinner';

import TermsComponents from 'components/templates/TermsComponents';

const HomePage = React.lazy(() => import('pages/HomePage'));
const LoginPage = React.lazy(() => import('pages/LoginPage'));
const SignupPage = React.lazy(() => import('pages/SignupPage'));
const ForgotPasswordPage = React.lazy(() => import('pages/ForgotPasswordPage'));
const SubscriptionsPage = React.lazy(() => import('pages/SubscriptionsPage'));
const AllProjectsPage = React.lazy(() => import('pages/AllProjectsPage'));
const Search = React.lazy(() => import('pages/Search'));
const TagPage = React.lazy(() => import('pages/TagPage'));
const ProjectPage = React.lazy(() => import('pages/ProjectPage'));
const SeriesPage = React.lazy(() => import('pages/SeriesPage'));
const PostPage = React.lazy(() => import('pages/PostPage'));
const MyPage = React.lazy(() => import('pages/MyPage'));
const CPR = React.lazy(() => import('pages/Campaigns/CPR'));
const DNFCreativeLeague = React.lazy(() => import('pages/Campaigns/DNFCreativeLeague'));
const CreatorsGuide = React.lazy(() => import('pages/CreatorsGuide'));

const Dashboard = React.lazy(() => import('Dashboard'));

const Terms = React.lazy(() => importMDX('pages/Terms.mdx'));
const Privacy = React.lazy(() => importMDX('pages/Privacy.mdx'));

const StyledRouter = styled(Router)`
  display: flex;
  flex: 1 0 auto;
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
    async function loading() {
      try {
        await getCurrentUser();
      } finally {
        setIsLoaded(true);
      }
    }
    loading();
    return setIsLoaded(false);
  }, [getCurrentUser]);

  return (
    <div className="root">
      {isLoaded && (
        <LayoutProvider>
          <GlobalHeader />
          <Suspense fallback={<Spinner />}>
            <StyledRouter primary={false}>
              <HomePage path="/" />
              <LoginPage path="login" />
              <SignupPage path="signup/*" />
              <ForgotPasswordPage path="forgot_password/*" />

              <SubscriptionsPage path="subscriptions" />
              <AllProjectsPage path="all" />
              <TagPage path="tag/:tagName" />
              <Search path="search" />

              <ProjectPage path="project/:projectId/*" />
              <SeriesPage path="project/:projectId/series/:seriesId" />
              <PostPage path="project/:projectId/posts/:postId" />

              <MyPage path="my/*" />
              <Dashboard path="dashboard/*" />

              <Terms components={TermsComponents} path="terms" />
              <Privacy components={TermsComponents} path="privacy" />

              <DNFCreativeLeague path="campaigns/dnfcreativeleague" />
              <CPR path="campaigns/cpr_2019" />

              <CreatorsGuide path="creatorsguide" />

              <Redirect from="/en" to="/" noThrow />
              <Redirect from="/ko" to="/" noThrow />

              <NotFound default />
            </StyledRouter>
          </Suspense>
          <GlobalFooter />
        </LayoutProvider>
      )}
    </div>
  );
}

export default App;
