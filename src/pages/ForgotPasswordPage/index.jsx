import React from 'react';
import { Routes, Route } from 'react-router-dom';

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
  return (
    <CompactTemplate>
      <Styled.Heading>
        비밀번호 재설정
      </Styled.Heading>
      <Routes basepath="/forgot_password">
        <Route path="/" element={<ForgotPasswordForm />} />
        <Route path="/edit" element={<ResetPasswordForm />} />
      </Routes>
    </CompactTemplate>
  );
}

export default ForgotPasswordPage;
