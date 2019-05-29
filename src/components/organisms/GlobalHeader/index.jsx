import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { ReactComponent as Logo } from 'images/piction-logo.svg';


const Styled = {
  Header: styled.header`
  `,
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    height: 80px;
  `,
  Logo: styled(Logo)`
    width: 155px;
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
};

function GlobalHeader({ paths, user }) {
  return (
    <Styled.Header>
      <Styled.Wrapper>
        <Link to={paths.home}>
          <Styled.Logo />
        </Link>
        <Styled.Nav>
          {user ? (
            <div>
              user
            </div>
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
  user: PropTypes.object,
};

GlobalHeader.defaultProps = {
  paths: {
    home: '/',
    login: '/login',
    signup: '/signup',
  },
  user: {},
};

export default GlobalHeader;
