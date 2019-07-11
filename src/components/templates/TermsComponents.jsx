// import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  max-width: 610px;
  margin: 0 auto;
  padding: 16px;
`;

const H1 = styled.h1`
  font-size: 30px;
  margin-top: 78px;
  padding-bottom: 48px;
`;

const H2 = styled.h2`
  margin-top: 24px;
  margin-bottom: 8px;
  padding-top: 24px;
  border-top: 1px solid var(--gray--light);
  font-size: 18px;
`;

const P = styled.p`
  line-height: 1.8;
`;

const OL = styled.ol`
  list-style: dot;
`;
const UL = styled.ul`
  list-style: decimal;
`;
const LI = styled.li`
  list-style: inherit;
`;


const components = {
  wrapper: Wrapper,
  h1: H1,
  h2: H2,
  p: P,
  ol: OL,
  ul: UL,
  li: LI,
};

export default components;
