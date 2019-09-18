import React from 'react';
import { Router } from '@reach/router';

import styled from 'styled-components';

import withLoginChecker from 'components/LoginChecker';

import CompactTemplate from 'components/templates/CompactTemplate';
import ForgotPasswordForm from 'components/organisms/ForgotPasswordForm';
import Heading from 'components/atoms/Heading';

const Styled = {
  Heading: styled(Heading)`
    margin-bottom: 24px;
    text-align: center;
  `,
};

function ForgotPasswordPage() {
  return (
    <CompactTemplate>
      <Styled.Heading>
        비밀번호 재설정
      </Styled.Heading>
      <Router primary={false} basepath="/forgot_password">
        <ForgotPasswordForm path="/" />
      </Router>
    </CompactTemplate>
  );
}

export default withLoginChecker(ForgotPasswordPage, false, '/');
