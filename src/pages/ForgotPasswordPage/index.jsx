import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import styled from 'styled-components/macro';

import CompactTemplate from 'components/templates/CompactTemplate';
import Heading from 'components/atoms/Heading';

const ForgotPasswordForm = React.lazy(() => import('components/organisms/ForgotPasswordForm'));
const ResetPasswordForm = React.lazy(() => import('components/organisms/ResetPasswordForm'));

const Styled = {
  Heading: styled(Heading)`
    margin-bottom: 24px;
    text-align: center;
  `,
};

function ForgotPasswordPage() {
  const { path } = useRouteMatch();
  return (
    <CompactTemplate>
      <Styled.Heading>
        비밀번호 재설정
      </Styled.Heading>
      <Switch>
        <Route exact path={path} component={ForgotPasswordForm} />
        <Route path={`${path}/edit`} component={ResetPasswordForm} />
      </Switch>
    </CompactTemplate>
  );
}

export default ForgotPasswordPage;
