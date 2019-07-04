import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = {
  Main: styled.main.attrs({
    role: 'main',
  })`
    display: flex;
    flex: 1;
    flex-flow: column;
  `,

  Container: styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    max-width: var(--max-width);
    margin: 24px auto;
    padding: 0 var(--outer-gap);
    background-color: var(--white);
  `,
};

function UserTemplate({ hero, children }) {
  return (
    <Styled.Main>
      {hero}
      <Styled.Container>
        {children}
      </Styled.Container>
    </Styled.Main>
  );
}

UserTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  hero: PropTypes.node,
};

UserTemplate.defaultProps = {
  hero: null,
};

export default UserTemplate;
