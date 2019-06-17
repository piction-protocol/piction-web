import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useCurrentUser from 'hooks/useCurrentUser';

const Styled = {
  Section: styled.section`
    display: flex;
    align-items: center;
    padding: 40px var(--gap);
    background-color: var(--gray--light);
  `,
  Wrapper: styled.div`
    display: flex;
    flex: 1;
    flex-flow: row wrap;
    max-width: var(--max-width);
  `,
  Picture: styled.div`
    width: 85px;
    height: 85px;
    margin-right: var(--gap);
    border-radius: 50%;
    background-image: url(${({ src }) => src});
    background-size: cover;
    background-position: center;
  `,
  Name: styled.h1`
    margin-bottom: 4px;
    font-size: var(--font-size--large);
  `,
  Description: styled.p`
    color: var(--gray--dark);
  `,
  Children: styled.div`
    margin-left: auto;
  `,
};

function UserInfo({ description, children }) {
  const { currentUser } = useCurrentUser();

  return (
    <Styled.Section>
      <Styled.Wrapper>
        <Styled.Picture src={currentUser.picture} />
        <div>
          <Styled.Name>
            {currentUser.username}
          </Styled.Name>
          <Styled.Description>
            {description}
          </Styled.Description>
        </div>
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
  description: PropTypes.string.isRequired,
  children: PropTypes.node,
};

UserInfo.defaultProps = {
  children: '',
};

export default UserInfo;
