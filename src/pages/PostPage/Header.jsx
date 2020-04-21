import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import media from 'styles/media';

import Heading from 'components/atoms/Heading';
import UserProfile from 'components/atoms/ContentImage/UserProfile';

const Styled = {
  Info: styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: var(--row-gap);
    padding-bottom: var(--row-gap);
    border-bottom: 1px solid var(--gray--light);
    text-align: center;
  `,
  SeriesName: styled(Link)`
    margin-bottom: 8px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  User: styled.div`
    display: flex;
    margin-top: 8px;
    font-size: var(--font-size--small);
    ${media.desktop`
      margin-top: 16px;
      align-items: center;
      font-size: var(--font-size--base);
      font-weight: bold;
    `}
  `,
  UserProfile: styled(UserProfile)`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 8px;
    ${media.desktop`
      width: 27px;
      height: 27px;
    `}
  `,
};

const Header = ({ title, user, series }) => (
  <Styled.Info>
    {series && (
      <Styled.SeriesName to={`../../series/${series.id}`}>
        {`시리즈 · ${series.name}`}
      </Styled.SeriesName>
    )}
    <Heading>{title}</Heading>
    <Link to={`/creator-profile/${user.loginId}`}>
      <Styled.User>
        <Styled.UserProfile image={user.picture} />
        {user.username}
      </Styled.User>
    </Link>
  </Styled.Info>
);

Header.propTypes = {
  title: PropTypes.string,
  user: PropTypes.shape({
    picture: PropTypes.string,
    username: PropTypes.string,
    loginId: PropTypes.string,
  }).isRequired,
  series: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
};

Header.Placeholder = () => (
  <Styled.Info>
    <div style={{
      color: 'var(--gray--light)',
      backgroundColor: 'var(--gray--light)',
      width: '60%',
      height: '45px',
    }}
    />
    <div style={{
      color: 'var(--gray--light)',
      backgroundColor: 'var(--gray--light)',
      width: '30%',
      marginTop: '16px',
      height: '27px',
    }}
    />
  </Styled.Info>
);

export default Header;
