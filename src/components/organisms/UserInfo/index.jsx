import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = {
  Section: styled.section`
    display: flex;
    background-color: var(--gray--light);
  `,
  Wrapper: styled.div`
    display: flex;
    flex: 1;
    flex-flow: row wrap;
    align-items: center;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 40px var(--gap);
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
        <div>
          <Styled.Name>
            {username}
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
