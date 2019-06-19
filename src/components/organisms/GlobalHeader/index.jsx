import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useCurrentUser from 'hooks/useCurrentUser';
import useWallet from 'hooks/useWallet';

import { PrimaryButton } from 'components/atoms/Button';
import UserMenu from 'components/molecules/UserMenu';

import { ReactComponent as Logo } from 'images/piction-logo.svg';

const Styled = {
  Header: styled.header`
    height: 80px;
    border-bottom: 1px solid var(--gray--light);
    background-color: var(--white);
  `,
  Wrapper: styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    max-width: var(--max-width);
    margin: auto;
    padding: var(--gap);
  `,
  Logo: styled(Logo)`
    height: 40px;
    vertical-align: middle;
  `,
  Nav: styled.nav`
    > *:not(:last-child) {
      margin-right: 32px;
    }
    display: flex;
    align-items: center;
    margin-left: auto;
  `,
  Login: styled(Link)`
    color: var(--black);
    font-size: var(--font-size--small);
  `,
  User: styled.div`
    display: flex;
    position: relative;
  `,
  Toggle: styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url(${({ src }) => src});
    background-position: center;
    background-size: cover;
    cursor: pointer;
  `,
  UserMenu: styled(UserMenu)`
    position: absolute;
    top: 56px;
    right: 0;
    width: 190px;
  `,
};

function GlobalHeader({ paths }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { currentUser, deleteSession } = useCurrentUser();
  const [wallet] = useWallet();

  return (
    <Styled.Header>
      <Styled.Wrapper>
        <Link to={paths.home}>
          <Styled.Logo />
        </Link>
        <Styled.Nav>
          {currentUser ? (
            <Styled.User>
              <Styled.Toggle
                src={currentUser.picture}
                onClick={() => setIsMenuOpened(prevState => !prevState)}
              />
              {isMenuOpened && (
                <Styled.UserMenu
                  PXL={wallet.amount}
                  links={[
                    { text: '내 정보', to: '/my/info' },
                    { text: '크리에이터 대시보드', to: '/dashboard' },
                    { text: '새 프로젝트 만들기', to: '/dashboard/new-project' },
                    { text: '로그아웃', as: 'button', onClick: () => (deleteSession()) },
                  ]}
                />
              )}
            </Styled.User>
          ) : (
            <>
              <Styled.Login to={paths.login}>
                로그인
              </Styled.Login>
              <Link to={paths.signup}>
                <PrimaryButton size="mini">
                  회원가입
                </PrimaryButton>
              </Link>
            </>
          )}
        </Styled.Nav>
      </Styled.Wrapper>
    </Styled.Header>
  );
}

GlobalHeader.propTypes = {
  paths: PropTypes.object,
};

GlobalHeader.defaultProps = {
  paths: {
    home: '/',
    login: '/login',
    signup: '/signup',
  },
};

export default GlobalHeader;
