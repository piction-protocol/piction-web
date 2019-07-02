import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MainGrid } from 'styles/Grid';

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
    grid-column: 1 / -1;
    background-color: var(--white);
    margin: 24px 0;
  `,
};

function GridTemplate({ hero, children }) {
  return (
    <Styled.Main>
      {hero}
      <MainGrid>
        <Styled.Container>
          {children}
        </Styled.Container>
      </MainGrid>
    </Styled.Main>
  );
}

GridTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  hero: PropTypes.node,
};

GridTemplate.defaultProps = {
  hero: null,
};

export default GridTemplate;
