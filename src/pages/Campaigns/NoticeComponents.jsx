import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import media from 'styles/media';
import Grid, { MainGrid } from 'styles/Grid';

const Wrapper = styled.section`
  --row-gap: 16px;
  padding-top: 48px;
  padding-bottom: 48px;
  background-color: #232323;
  color: var(--white);
  word-break: break-all;
  ${media.desktop`
    --row-gap: 24px;
    padding-top: 100px;
    padding-bottom: 100px;
  `}
`;

const H1 = styled.h1`
  grid-column: 1 / -1;
  font-size: 24px;
  ${media.desktop`
    grid-column: 3 / -3;
    font-size: 32px;
  `}
`;

const UL = styled(Grid).attrs({
  as: 'ul',
  columns: 'var(--columns)',
})`
  --columns: 6;
  grid-column: 1 / span var(--columns);
  ${media.desktop`
    --columns: 8;
    grid-column: 3 / -3;
  `}
`;

const LI = styled(Grid).attrs({
  as: 'li',
  columns: 'var(--columns)',
})`
  grid-column: 1 / -1;
  padding-top: var(--row-gap);
  border-top: 1px solid var(--white);
  font-size: var(--font-size--small);
  ${media.desktop`
    font-size: 16px;
  `}
`;

const H2 = styled.h2`
  grid-column: 1 / 3;
`;

const P = styled.p`
  grid-column: 3 / -1;
  color: var(--gray--dark);
`;

const A = styled.a.attrs(() => ({
  target: '_blank',
}))`
  color: var(--white);
  font-weight: bold;
  text-decoration: underline;
`;

const components = {
  wrapper: ({ children }) => (
    <Wrapper>
      <MainGrid>
        {children}
      </MainGrid>
    </Wrapper>
  ),
  h1: H1,
  h2: H2,
  p: P,
  ul: UL,
  li: LI,
  a: A,
};

components.wrapper.propTypes = {
  children: PropTypes.node,
};

export default components;
