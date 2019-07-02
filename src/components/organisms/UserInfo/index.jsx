import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MainGrid } from 'styles/Grid';
import media from 'styles/media';

const Styled = {
  Section: styled.section`
    display: flex;
    background-color: var(--gray--light);
  `,
  Wrapper: styled(MainGrid)`
    align-items: center;
    max-width: var(--max-width);
    margin: 0 auto;
    padding-top: 24px;
    padding-bottom: 24px;
    ${media.desktop`
      padding-top: 40px;
      padding-bottom: 40px;
    `}
  `,
  Picture: styled.div`
    grid-column: span 1;
    padding-top: 100%;
    border-radius: 50%;
    background-image: url(${({ src }) => src});
    background-size: cover;
    background-position: center;
  `,
  User: styled.div`
    grid-column: 2 / -1;
  `,
  Name: styled.h1`
    font-size: var(--font-size--base);
    ${media.desktop`
      margin-bottom: 8px;
      font-size: var(--font-size--large);
    `}
  `,
  Description: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    ${media.desktop`
      font-size: var(--font-size--base);
    `}
  `,
  Children: styled.div`
    margin-left: auto;
  `,
};

function UserInfo({
  picture,
  username,
  description,
  children,
}) {
  return (
    <Styled.Section>
      <Styled.Wrapper>
        <Styled.Picture src={picture} />
        <Styled.User>
          <Styled.Name>
            {username}
          </Styled.Name>
          <Styled.Description>
            {description}
          </Styled.Description>
        </Styled.User>
        {children && (
          <Styled.Children>
            {children}
          </Styled.Children>
        )}
      </Styled.Wrapper>
    </Styled.Section>
  );
}

UserInfo.propTypes = {
  picture: PropTypes.string,
  username: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
};

UserInfo.defaultProps = {
  picture: '',
  description: '',
  children: null,
};

export default UserInfo;
