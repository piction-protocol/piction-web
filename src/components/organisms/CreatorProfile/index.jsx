import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import media from 'styles/media';
import placeholder from 'styles/placeholder';
import Grid from 'styles/Grid';

import UserProfile from 'components/atoms/ContentImage/UserProfile';
import Heading from 'components/atoms/Heading';
import ExternalLink from 'components/atoms/ExternalLink';
import ExternalFavicon from 'components/atoms/ExternalFavicon';

const Styled = {
  CreatorProfile: styled(Grid).attrs({
    as: 'section',
  })`
    --grid-columns: 6;
    --row-gap: 0;
    grid-column: 1 / -1;
    text-align: center;
    ${media.desktop`
      --grid-columns: 10;
      grid-column: 2 / -2;
      margin-bottom: 16px;
    `}
  `,
  UserProfile: styled(UserProfile)`
    grid-column: 3 / -3;
    margin-top: 40px;
    border-radius: 50%;
    ${media.desktop`
      grid-column: 5 / -5;
      margin-bottom: 20px;
    `}
  `,
  Heading: styled(Heading)`
    grid-column: 1 / -1;
    ${placeholder}
  `,
  Id: styled.p`
    grid-column: 1 / -1;
    margin-top: 4px;
    color: var(--gray);
    font-size: var(--font-size--small);
    ${media.desktop`
      font-size: var(--font-size--base);
    `}
    ${placeholder}
  `,
  Greetings: styled.p`
    grid-column: 1 / -1;
    margin-top: 12px;
    font-size: var(--font-size--small);
    white-space: pre-line;
    ${placeholder}
  `,
  Links: styled.div`
    display: flex;
    grid-column: 1 / -1;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
  `,
  ExternalFavicon: styled(ExternalFavicon)`
    width: 24px;
    height: 24px;
    margin-right: 8px;
  `,
  ExternalLink: styled(ExternalLink)`
    margin: 8px 4px 0;
  `,
};

function CreatorProfile({ user, profile }) {
  return (
    <Styled.CreatorProfile>
      <Styled.UserProfile image={user?.picture} />
      <Styled.Heading>
        {user.username}
      </Styled.Heading>
      <Styled.Id>
        @
        {user.loginId}
      </Styled.Id>
      <Styled.Greetings>
        {profile.greetings}
      </Styled.Greetings>
      <Styled.Links>
        {profile.links.map(({ id, url, name }) => (
          <Styled.ExternalLink key={id} url={url}>
            <Styled.ExternalFavicon url={url} />
            {name}
          </Styled.ExternalLink>
        ))}
      </Styled.Links>
    </Styled.CreatorProfile>
  );
}

CreatorProfile.Placeholder = () => (
  <Styled.CreatorProfile>
    <Styled.UserProfile image={null} />
    <Styled.Heading isPlaceholder>
      username
    </Styled.Heading>
    <Styled.Id isPlaceholder>
      loginId
    </Styled.Id>
    <Styled.Greetings isPlaceholder>
      greetings
    </Styled.Greetings>
  </Styled.CreatorProfile>
);

export default CreatorProfile;

CreatorProfile.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object,
};
