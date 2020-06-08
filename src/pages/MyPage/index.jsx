import React from 'react';
import { Router, Redirect } from '@reach/router';
import styled from 'styled-components/macro';
import { useTranslation, withTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        {t('내 정보')}
      </Styled.Heading>
      <Styled.Tabs
        links={[
          { text: `${t('기본정보')}`, to: 'info' },
          { text: `${t('비밀번호 변경')}`, to: 'password' },
        ]}
      />
      <Router primary={false}>
        <Redirect from="/" to="info" noThrow />
        <UpdateUserForm path="info" />
        <UpdatePasswordForm path="password" />
      </Router>
    </UserTemplate>
  );
}

export default withTranslation()(MyPage); withLoginChecker(MyPage);
