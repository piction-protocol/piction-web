import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, Location } from '@reach/router';

import media, { mediaQuery } from 'styles/media';

import { LayoutContext } from 'context/LayoutContext';

import useCurrentUser from 'hooks/useCurrentUser';
import useMedia from 'hooks/useMedia';
import useWallet from 'hooks/useWallet';
import useOnClickOutside from 'hooks/useOnClickOutside';

import ProjectTitle from 'components/molecules/ProjectTitle';
import UserMenu from 'components/molecules/UserMenu';
import Dropdown from 'components/atoms/Dropdown';
import Sidemenu from 'components/atoms/Sidemenu';

import { ReactComponent as Logo } from 'images/piction-logo.svg';
import { ReactComponent as SubscriptionsIcon } from 'images/ic-subscriptions.svg';
import { ReactComponent as AccountIcon } from 'images/ic-account.svg';
import { ReactComponent as DashboardIcon } from 'images/ic-dashboard.svg';
import { ReactComponent as NewProjectIcon } from 'images/ic-newproject.svg';
import { ReactComponent as LogoutIcon } from 'images/ic-logout.svg';

const Styled = {
  Header: styled.header`
    border-bottom: 1px solid var(--gray--light);
    background-color: var(--white);
  `,
  Wrapper: styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    height: 52px;
    padding: 0 var(--outer-gap);
    ${media.desktop`
      max-width: var(--max-width);
      height: 80px;
      margin: auto;
    `}
  `,
  Link: styled(Link)`
    display: flex;
  `,
  Logo: styled(Logo)`
    height: 20px;
    ${media.desktop`
      height: 40px;
    `}
  `,
  Nav: styled.nav`
    display: flex;
    align-items: center;
    margin-left: auto;
    white-space: nowrap;
    > *:not(:last-child) {
      margin-right: 16px;
      ${media.desktop`
        margin-right: 48px;
      `}
    }
  `,
  Login: styled(Link)`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Signup: styled(Link)`
    color: var(--blue);
    font-size: var(--font-size--small);
  `,
  User: styled.div`
    display: flex;
    position: relative;
  `,
  Toggle: styled.button`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-image: url(${({ src }) => src});
    background-position: center;
    background-size: cover;
    cursor: pointer;
    ${media.desktop`
      width: 40px;
      height: 40px;
    `}
  `,
  Dropdown: styled(Dropdown)`
    position: absolute;
    z-index: 10;
    top: 56px;
    right: 0;
    width: 240px;
  `,
};

function UserMenuWithWrapper({ close, ...props }) {
  const isDesktop = useMedia(mediaQuery.desktop);

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
  const [wallet] = useWallet();
  const [layout] = useContext(LayoutContext);

  const menuRef = useRef();

  useOnClickOutside(menuRef, () => setIsMenuOpened(false));

  const links = [
    { text: '구독 중인 프로젝트', to: '/subscriptions', icon: <SubscriptionsIcon /> },
    { text: '내 정보', to: '/my/info', icon: <AccountIcon /> },
    ...isDesktop ? [
      { text: '크리에이터 대시보드', to: '/dashboard', icon: <DashboardIcon /> },
      { text: '새 프로젝트 만들기', to: '/dashboard/new-project', icon: <NewProjectIcon /> },
    ] : [],
    {
      text: '로그아웃',
      icon: <LogoutIcon />,
      as: 'button',
      onClick: () => {
        setIsMenuOpened(false);
        deleteSession();
      },
    },
  ];

  return (
    <Styled.Header {...props}>
      <Location>
        {({ location }) => (
          <Styled.Wrapper>
            <NavigateListener location={location} event={() => setIsMenuOpened(false)} />
            {layout.type === 'project' ? (
              <ProjectTitle project={layout.data.project} />
            ) : (
              <Styled.Link to={paths.home}>
                <Styled.Logo />
              </Styled.Link>
            )}
            {/^\/login|^\/signup/.test(location.pathname) || (
              <Styled.Nav>
                {currentUser ? (
                  <Styled.User ref={menuRef}>
                    <Styled.Toggle
                      src={currentUser.picture}
                      onClick={() => setIsMenuOpened(prevState => !prevState)}
                    />
                    {isMenuOpened && (
                      <UserMenuWithWrapper
                        PXL={wallet.amount}
                        links={links}
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
              </Styled.Nav>
            )}
          </Styled.Wrapper>
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
