import React, { Suspense, useEffect } from 'react';
import {
  Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import { importMDX } from 'mdx.macro';
import { SWRConfig } from 'swr';
import createFetcher from 'config/fetcher';
import { ScrollContext } from 'gatsby-react-router-scroll';

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
  const location = useLocation();

  useEffect(() => {
    async function loading() {
      await getCurrentUser();
    }
    loading();
  }, [getCurrentUser]);

  useEffect(() => {
    const { SMPCTracking } = window;
    if (SMPCTracking) {
      SMPCTracking.active();
    }
  }, [location.pathname]);

  return (
    <div className="root">
      <ScrollContext location={{ ...location, action: '' }}>
        <SWRConfig value={{ ...swrConfig, fetcher }}>
          <LayoutProvider>
            <GlobalHeader />
            <Suspense fallback={<Spinner />}>

              <Routes>
                <Route path="/" exact element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup/*" element={<SignupPage />} />
                <Route path="forgot_password/*" element={<ForgotPasswordPage />} />
                <Route path="subscriptions" element={<SubscriptionsPage />} />
                <Route path="all" element={<AllProjectsPage />} />
                <Route path="search" element={<Search />} />
                <Route path="tag/:tagName" element={<TagPage />} />
                <Route path="category/:categoryId" element={<CategoryPage />} />
                <Route path="project/:projectId/*" element={<ProjectPage />} />
                <Route path="project/:projectId/memberships/purchase/:membershipId" element={<PurchasePage />} />
                <Route path="project/:projectId/series/:seriesId" element={<SeriesPage />} />
                <Route path="project/:projectId/posts/:postId" element={<PostPage />} />
                <Route path="creator-profile/:creatorId" element={<CreatorProfilePage />} />
                <Route path="my/*" element={<MyPage />} />
                <Route path="wallet/*" element={<WalletPage />} />
                <Route path="dashboard/*" element={<Dashboard />} />
                <Route path="terms" components={TermsComponents} element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="campaigns/dnfcreativeleague" element={<DNFCreativeLeague />} />
                <Route path="campaigns/cpr_2019" element={<CPR />} />
                <Route path="campaigns/hongik_2019" element={<Hongik />} />

                <Route path="creatorsguide" element={<CreatorsGuide />} />

                <Route path="newsletter/unsubscribe" element={<OptOut />} />

                <Route path="/en" element={<Navigate to="/" />} />
                <Route path="/ko" element={<Navigate to="/" />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <GlobalFooter />
          </LayoutProvider>
        </SWRConfig>
      </ScrollContext>
    </div>
  );
}

export default App;
