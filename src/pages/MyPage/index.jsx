import React from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';

import useCurrentUser from 'hooks/useCurrentUser';

import media from 'styles/media';

import GridTemplate from 'components/templates/GridTemplate';
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
  const createdDate = new Date(currentUser.createdAt);

  return (
    <GridTemplate
      hero={(
        <UserInfo
          username={currentUser.username}
          picture={currentUser.picture}
          description={`가입일: ${createdDate.getFullYear()}년 ${createdDate.getMonth() + 1}월 ${createdDate.getDate()}일`}
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
      <Router primary={false}>
        <UpdateUserForm path="info" />
        <UpdatePasswordForm path="password" />
      </Router>
    </GridTemplate>
  );
}


export default MyPage;
