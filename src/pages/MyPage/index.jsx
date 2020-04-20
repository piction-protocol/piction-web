import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components/macro';

import useCurrentUser from 'hooks/useCurrentUser';

import media from 'styles/media';

import withLoginChecker from 'components/LoginChecker';

import UserTemplate from 'components/templates/UserTemplate';
import UserInfo from 'components/organisms/UserInfo';
import Tabs from 'components/molecules/Tabs';
import Heading from 'components/atoms/Heading';

const UpdateUserForm = React.lazy(() => import('components/organisms/UpdateUserForm'));
const UpdatePasswordForm = React.lazy(() => import('components/organisms/UpdatePasswordForm'));

const Styled = {
  Heading: styled(Heading)`
    margin-bottom: 24px;
    ${media.mobile`
      display: none;
    `}
  `,
  Tabs: styled(Tabs)`
    ${media.mobile`
      margin: -24px calc(var(--outer-gap) * -1) 16px;
    `}
  `,
};

function MyPage() {
  const { currentUser } = useCurrentUser();

  return (
    <UserTemplate
      hero={(
        <UserInfo
          {...currentUser}
        />
      )}
    >
      <Styled.Heading>
        내 정보
      </Styled.Heading>
      <Styled.Tabs
        links={[
          { text: '기본정보', to: 'info' },
          { text: '비밀번호 변경', to: 'password' },
        ]}
      />
      <Routes>
        <Route path="/" element={<Navigate to="info" />} />
        <Route path="info" element={<UpdateUserForm />} />
        <Route path="password" element={<UpdatePasswordForm />} />
      </Routes>
    </UserTemplate>
  );
}

export default withLoginChecker(MyPage);
