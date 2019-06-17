import React from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';

import GridTemplate from 'components/templates/GridTemplate';
import UpdateUserForm from 'components/organisms/UpdateUserForm';
import UpdatePasswordForm from 'components/organisms/UpdatePasswordForm';
import UserInfo from 'components/organisms/UserInfo';
import Tabs from 'components/molecules/Tabs';
import Heading from 'components/atoms/Heading';

const Styled = {
  Heading: styled(Heading)`
    margin-bottom: 24px;
  `,
};

function MyPage() {
  return (
    <GridTemplate
      hero={(
        <UserInfo
          description="가입일: ~~~"
        />
      )}
    >
      <Styled.Heading>
        내 정보
      </Styled.Heading>
      <Tabs
        links={[
          { text: '기본 정보', to: '/my/info' },
          { text: '비밀번호 변경', to: '/my/password' },
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
