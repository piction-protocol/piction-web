import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useCurrentUser from 'hooks/useCurrentUser';

import UserMenu from 'components/molecules/UserMenu';

import { ReactComponent as Logo } from 'images/piction-logo.svg';
import DummyPicture from 'images/img-picture-dummy.png';

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
    margin-left: auto;
  `,
  Link: styled(Link)`
    color: var(--gray--dark);
  `,
  User: styled.div`
    display: flex;
    position: relative;
  `,
  Picture: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
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
  const { currentUser, logout } = useCurrentUser();

  return (
    <Styled.Header>
      <Styled.Wrapper>
        <Link to={paths.home}>
          <Styled.Logo />
        </Link>
        <Styled.Nav>
          {currentUser.email ? (
            <Styled.User>
              <Styled.Picture
                src={currentUser.picture || DummyPicture}
                onClick={() => setIsMenuOpened(prevState => !prevState)}
              />
              {isMenuOpened && (
                <Styled.UserMenu
                  links={[
                    { text: '내 정보', to: '' },
                    { text: '크리에이터 대시보드', to: '' },
                    { text: '새 프로젝트 만들기', to: '' },
                    { text: '로그아웃', as: 'button', onClick: () => (logout()) },
                  ]}
                />
              )}
            </Styled.User>
          ) : (
            <>
              <Styled.Link to={paths.login}>
                로그인
              </Styled.Link>
              <Styled.Link to={paths.signup}>
                회원가입
              </Styled.Link>
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
