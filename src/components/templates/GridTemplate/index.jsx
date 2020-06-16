import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { MainGrid } from 'styles/Grid';

const Styled = {
  Main: styled.main.attrs({
    role: 'main',
  })`
    display: flex;
    flex: 1;
    flex-flow: column;
    margin-bottom: var(--row-gap);
  `,
};

const GridTemplate = forwardRef(({ hero = null, children, ...props }, ref) => (
  <Styled.Main {...props}>
    {hero}
    <MainGrid ref={ref}>
      {children}
    </MainGrid>
  </Styled.Main>
));

GridTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  hero: PropTypes.node,
};

export default GridTemplate;
