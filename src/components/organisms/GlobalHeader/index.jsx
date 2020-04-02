import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link, Location } from '@reach/router';

import media, { mediaQuery } from 'styles/media';

import { LayoutContext } from 'contexts/LayoutContext';

import useCurrentUser from 'hooks/useCurrentUser';
import useMedia from 'hooks/useMedia';
import useOnClickOutside from 'hooks/useOnClickOutside';

import ProjectTitle from 'components/molecules/ProjectTitle';
import UserMenu from 'components/molecules/UserMenu';
import SearchBox from 'components/molecules/SearchBox';
import UserProfile from 'components/atoms/ContentImage/UserProfile';
import Dropdown from 'components/atoms/Dropdown';
import Sidemenu from 'components/atoms/Sidemenu';

import { ReactComponent as Logo } from 'images/piction-logo.svg';
import { ReactComponent as MenuIcon } from 'images/ic-menu.svg';
import { ReactComponent as SubscriptionsIcon } from 'images/ic-subscriptions.svg';
import { ReactComponent as AccountIcon } from 'images/ic-account.svg';
import { ReactComponent as ProjectsIcon } from 'images/ic-entire-project.svg';
import { ReactComponent as PictionIcon } from 'images/ic-piction-symbol-black.svg';
import { ReactComponent as LogoutIcon } from 'images/ic-logout.svg';

const Styled = {
  Header: styled.header`
    border-bottom: 1px solid #F2F2F2;
    border-bottom: 1px solid var(--gray--light);
    background-color: #FFFFFF;
    background-color: var(--white);
  `,
  Nav: styled.nav`
    display: flex;
    flex: 1;
    align-items: center;
    height: 52px;
    padding: 0 var(--outer-gap);
    font-size: var(--font-size--small);
    white-space: nowrap;
    ${media.desktop`
      max-width: 1280px;
      max-width: var(--max-width);
      height: 80px;
      margin: auto;
      padding: 0 20px;
      padding: 0 var(--outer-gap);
    `}
  `,
  Link: styled(Link)`
    display: flex;
    margin-right: 12px;
    ${media.desktop`
      margin-right: 40px;
    `}
  `,
  Logo: styled(Logo)`
    height: 20px;
    ${media.desktop`
      width: 155px;
      height: 40px;
    `}
  `,
  SearchBox: styled(SearchBox)`
    flex: 1;
    min-width: 0;
    margin-right: 16px;
    margin-left: auto;
    ${media.desktop`
      flex: 0 auto;
      width: 220px;
      margin-right: 40px;
    `}
  `,
  Login: styled(Link)`
    margin-right: 40px;
    color: #BFBFBF;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Signup: styled(Link)`
    color: #1A92FF;
    color: var(--blue);
    font-size: var(--font-size--small);
  `,
  User: styled.div`
    display: flex;
    position: relative;
  `,
  Toggle: styled.button`
    display: flex;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--charcoal-black);
    background-position: center;
    background-size: cover;
    cursor: pointer;
    ${media.mobile`
      margin-left: 16px;
    `}
    ${media.desktop`
      width: 40px;
      height: 40px;
    `}
  `,
  UserProfile: styled(UserProfile)`
    flex: 1;
  `,
  Dropdown: styled(Dropdown)`
    position: absolute;
    z-index: 10;
    top: 56px;
    right: 0;
    width: 240px;
  `,
};

function UserMenuWithWrapper({ isDesktop, close, ...props }) {
  return (
    isDesktop ? (
      <Styled.Dropdown>
        <UserMenu {...props} />
      </Styled.Dropdown>
    ) : (
      <Sidemenu close={close}>
        <UserMenu {...props} />
      </Sidemenu>
    )
  );
}

UserMenuWithWrapper.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

const NavigateListener = ({ location, event }) => {
  useEffect(event, [location]);
  return null;
};

function GlobalHeader({ paths, child, ...props }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { currentUser, deleteSession } = useCurrentUser();
  const isDesktop = useMedia(mediaQuery.desktop);
  const [layout] = useContext(LayoutContext);

  const menuRef = useRef();

  useOnClickOutside(menuRef, () => setIsMenuOpened(false));

  const links = [
    ...isDesktop ? [] : [
      { text: '전체 프로젝트', to: '/all', icon: <ProjectsIcon /> },
      { text: '크리에이터 가이드', to: '/creatorsguide', icon: <PictionIcon /> },
    ],
    ...currentUser ? [
      { text: '구독 중인 프로젝트', to: '/subscriptions', icon: <SubscriptionsIcon /> },
      { text: '내 정보', to: '/my/info', icon: <AccountIcon /> },
      {
        text: '로그아웃',
        icon: <LogoutIcon />,
        as: 'button',
        onClick: () => {
          setIsMenuOpened(false);
          deleteSession();
        },
      },
    ] : [
      {
        text: '로그인',
        to: paths.login,
        icon: <AccountIcon />,
        state: { redirectTo: encodeURIComponent(window.location.pathname) },
      },
      {
        text: '회원가입',
        to: paths.signup,
        icon: <PictionIcon />,
        state: { redirectTo: encodeURIComponent(window.location.pathname) },
      },
    ],
  ];

  return (
    <Styled.Header {...props}>
      <Location>
        {({ location }) => (
          <Styled.Nav>
            <NavigateListener location={location} event={() => setIsMenuOpened(false)} />
            {layout.type === 'project' ? (
              <ProjectTitle project={layout.data.project} />
            ) : (
              <>
                <Styled.Link to={paths.home}>
                  <Styled.Logo />
                </Styled.Link>
                {isDesktop && (
                  <>
                    <Styled.Link to="/all">
                      전체 프로젝트
                    </Styled.Link>
                    <Styled.Link to="/creatorsguide">
                      크리에이터 가이드
                    </Styled.Link>
                  </>
                )}
              </>
            )}
            {/^\/login|^\/signup/.test(location.pathname) || (
              <>
                <Styled.SearchBox />
                {currentUser || !isDesktop ? (
                  <Styled.User ref={menuRef}>
                    <Styled.Toggle
                      onClick={() => setIsMenuOpened(prevState => !prevState)}
                    >
                      {currentUser ? (
                        <Styled.UserProfile image={currentUser.picture} />
                      ) : (
                        <MenuIcon />
                      )}
                    </Styled.Toggle>
                    {isMenuOpened && (
                      <UserMenuWithWrapper
                        links={links}
                        isDesktop={isDesktop}
                        close={() => setIsMenuOpened(false)}
                      />
                    )}
                  </Styled.User>
                ) : (
                  <>
                    <Styled.Login
                      to={paths.login}
                      state={{
                        redirectTo: encodeURIComponent(location.pathname),
                      }}
                    >
                      로그인
                    </Styled.Login>
                    <Styled.Signup
                      to={paths.signup}
                      state={{
                        redirectTo: encodeURIComponent(location.pathname),
                      }}
                    >
                      회원가입
                    </Styled.Signup>
                  </>
                )}
              </>
            )}
          </Styled.Nav>
        )}
      </Location>
    </Styled.Header>
  );
}

GlobalHeader.propTypes = {
  paths: PropTypes.object,
  child: PropTypes.node,
};

GlobalHeader.defaultProps = {
  paths: {
    home: '/',
    login: '/login',
    signup: '/signup',
  },
};

export default GlobalHeader;
