import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { importMDX } from 'mdx.macro'
import { ConnectedRouter } from 'connected-react-router'

import history from 'config/history'

import GlobalHeader from 'components/organisms/GlobalHeader'
import GlobalFooter from 'components/organisms/GlobalFooter'
import Spinner from 'components/atoms/Spinner'

import TermsComponents from 'components/templates/TermsComponents'

const HomePage = React.lazy(() => import('pages/HomePage'))
const LoginPage = React.lazy(() => import('pages/LoginPage'))
const SignupPage = React.lazy(() => import('pages/SignupPage'))
const ForgotPasswordPage = React.lazy(() => import('pages/ForgotPasswordPage'))
const SubscriptionsPage = React.lazy(() => import('pages/SubscriptionsPage'))
const AllProjectsPage = React.lazy(() => import('pages/AllProjectsPage'))
const Search = React.lazy(() => import('pages/Search'))
const TagPage = React.lazy(() => import('pages/TagPage'))
const CategoryPage = React.lazy(() => import('pages/CategoryPage'))
const ProjectPage = React.lazy(() => import('pages/ProjectPage'))
const PurchasePage = React.lazy(() => import('pages/PurchasePage'))
const SeriesPage = React.lazy(() => import('pages/SeriesPage'))
const PostPage = React.lazy(() => import('pages/PostPage'))
const CreatorProfilePage = React.lazy(() => import('pages/CreatorProfilePage'))
const MyPage = React.lazy(() => import('pages/MyPage'))
const WalletPage = React.lazy(() => import('pages/WalletPage'))
const CreatorsGuide = React.lazy(() => import('pages/CreatorsGuide'))
const OptOut = React.lazy(() => import('pages/OptOut'))
const Dashboard = React.lazy(() => import('Dashboard'))

const Terms = React.lazy(() => importMDX('pages/Terms.mdx'))
const Privacy = React.lazy(() => importMDX('pages/Privacy.mdx'))

const Hongik = React.lazy(() => import('pages/Campaigns/Hongik'))
const CPR = React.lazy(() => import('pages/Campaigns/CPR'))
const DNFCreativeLeague = React.lazy(() => import('pages/Campaigns/DNFCreativeLeague'))

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

const Routes = () => {
  return (
    <ConnectedRouter history={history}>
      <GlobalHeader />
      <React.Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/forgot_password" component={ForgotPasswordPage} />
          <Route path="/subscriptions" component={SubscriptionsPage} />
          <Route path="/all" component={AllProjectsPage} />
          <Route path="/search" component={Search} />
          <Route path="/tag/:tagName" component={TagPage} />
          <Route path="/category/:categoryId" component={CategoryPage} />

          <Route path="/project/:projectId/posts/:postId" component={PostPage} />
          <Route path="/project/:projectId/memberships/purchase/:membershipId" component={PurchasePage} />
          <Route path="/project/:projectId/series/:seriesId" component={SeriesPage} />
          <Route path="/project/:projectId" component={ProjectPage} />

          <Route path="/creator-profile/:creatorId" component={CreatorProfilePage} />
          <Route path="/my" component={MyPage} />
          <Route path="/wallet" component={WalletPage} />
          <Route path="/dashboard" component={Dashboard} />

          <Route path="/terms">
            <Terms components={TermsComponents} />
          </Route>
          <Route path="/privacy">
            <Privacy components={TermsComponents} />
          </Route>

          <Route path="/campaigns/dnfcreativeleague" component={DNFCreativeLeague} />
          <Route path="/campaigns/cpr_2019" component={CPR} />
          <Route path="/campaigns/hongik_2019" component={Hongik} />

          <Route path="/creatorsguide" component={CreatorsGuide} />

          <Route path="/newsletter/unsubscribe" component={OptOut} />

          <Route path="/en" element={<Redirect to="/" />} />
          <Route path="/ko" element={<Redirect to="/" />} />

          <Route path="*" component={NotFound} />
        </Switch>
      </React.Suspense>
      <GlobalFooter />
    </ConnectedRouter>
  )
}

export default Routes