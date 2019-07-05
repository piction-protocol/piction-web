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
};

function GridTemplate({ hero, children }) {
  return (
    <Styled.Main>
      {hero}
      <MainGrid>
        {children}
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
