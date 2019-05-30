import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

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
  user: null,
};

export default GlobalHeader;
