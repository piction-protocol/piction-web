import React from 'react';
import { Router } from '@reach/router';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <CompactTemplate>
      <Styled.Heading>
        {t('비밀번호 재설정')}
      </Styled.Heading>
      <Router primary={false} basepath="/forgot_password">
        <ForgotPasswordForm path="/" />
        <ResetPasswordForm path="/edit" />
      </Router>
    </CompactTemplate>
  );
}

export default ForgotPasswordPage;
