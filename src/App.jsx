import React, { Suspense, useEffect } from 'react';
import {
  Router, Location, Redirect, globalHistory,
} from '@reach/router';
import { importMDX } from 'mdx.macro';
import { SWRConfig } from 'swr';
import styled from 'styled-components/macro';
import createFetcher from 'config/fetcher';
import { ScrollContext } from 'gatsby-react-router-scroll';

import useCurrentUser from 'hooks/useCurrentUser';

import { LayoutProvider } from 'contexts/LayoutContext';

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
const CategoryPage = React.lazy(() => import('pages/CategoryPage'));
const ProjectPage = React.lazy(() => import('pages/ProjectPage'));
const PurchasePage = React.lazy(() => import('pages/PurchasePage'));
const SeriesPage = React.lazy(() => import('pages/SeriesPage'));
const PostPage = React.lazy(() => import('pages/PostPage'));
const CreatorProfilePage = React.lazy(() => import('pages/CreatorProfilePage'));
const MyPage = React.lazy(() => import('pages/MyPage'));
const WalletPage = React.lazy(() => import('pages/WalletPage'));
const CreatorsGuide = React.lazy(() => import('pages/CreatorsGuide'));
const OptOut = React.lazy(() => import('pages/OptOut'));
const Dashboard = React.lazy(() => import('Dashboard'));

const Terms = React.lazy(() => importMDX('pages/Terms.mdx'));
const Privacy = React.lazy(() => importMDX('pages/Privacy.mdx'));

const Hongik = React.lazy(() => import('pages/Campaigns/Hongik'));
const CPR = React.lazy(() => import('pages/Campaigns/CPR'));
const DNFCreativeLeague = React.lazy(() => import('pages/Campaigns/DNFCreativeLeague'));

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
  flex-flow: column;
`;

const swrConfig = {
  onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
    if (retryCount >= 3) return;
    if (error.response && error.response.status === 404) return;

    setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
  },
};

function App() {
  const { accessToken, getCurrentUser } = useCurrentUser();
  const fetcher = createFetcher(accessToken);

  useEffect(() => {
    async function loading() {
      await getCurrentUser();
    }
    loading();
  }, [getCurrentUser]);

  useEffect(() => globalHistory.listen(() => {
    const { SMPCTracking } = window;
    if (SMPCTracking) {
      SMPCTracking.active();
    }
  }), []);

  return (
    <div className="root">
      <Location>
        {locationContext => (
          <SWRConfig value={{ ...swrConfig, fetcher }}>
            <LayoutProvider>
              <GlobalHeader />
              <Suspense fallback={<Spinner />}>
                <ScrollContext location={locationContext.location}>
                  <StyledRouter>
                    <HomePage path="/" />
                    <LoginPage path="login" />
                    <SignupPage path="signup/*" />
                    <ForgotPasswordPage path="forgot_password/*" />

                    <SubscriptionsPage path="subscriptions" />
                    <AllProjectsPage path="all" />

                    <Search path="search" />
                    <TagPage path="tag/:tagName" />
                    <CategoryPage path="category/:categoryId" />

                    <ProjectPage path="project/:projectId/*" />
                    <PurchasePage path="project/:projectId/memberships/purchase/:membershipId" />
                    <SeriesPage path="project/:projectId/series/:seriesId" />
                    <PostPage path="project/:projectId/posts/:postId" />
                    <CreatorProfilePage path="creator-profile/:creatorId" />

                    <MyPage path="my/*" />
                    <WalletPage path="wallet/*" />
                    <Dashboard path="dashboard/*" />

                    <Terms components={TermsComponents} path="terms" />
                    <Privacy components={TermsComponents} path="privacy" />

                    <DNFCreativeLeague path="campaigns/dnfcreativeleague" />
                    <CPR path="campaigns/cpr_2019" />
                    <Hongik path="campaigns/hongik_2019" />

                    <CreatorsGuide path="creatorsguide" />

                    <OptOut path="newsletter/unsubscribe" />

                    <Redirect from="/en" to="/" noThrow />
                    <Redirect from="/ko" to="/" noThrow />

                    <NotFound default />
                  </StyledRouter>
                </ScrollContext>
              </Suspense>
              <GlobalFooter />
            </LayoutProvider>
          </SWRConfig>
        )}
      </Location>
    </div>
  );
}

export default App;
