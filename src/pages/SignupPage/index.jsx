import React from 'react';
import CompactTemplate from 'components/templates/CompactTemplate';
import { Switch, Route, useLocation, useRouteMatch } from 'react-router-dom';

import useRedirectWhenSignedIn from 'hooks/useRedirectWhenSignedIn';

import SignupForm from 'components/organisms/SignupForm';
import Welcome from 'components/organisms/Welcome';

function SignupPage() {
  const location = useLocation();
  const redirectTo = decodeURIComponent(location?.state ? location.state.redirectTo : '/');

  useRedirectWhenSignedIn(redirectTo);

  const { path } = useRouteMatch();
  console.log(path)

  return (
    <CompactTemplate>
      <Switch>
        <Route exact path={path} component={SignupForm} />
        <Route path={`${path}/welcome`}>
          <Welcome redirectTo={redirectTo} />
        </Route>
      </Switch>
    </CompactTemplate>
  );
}

export default SignupPage;
