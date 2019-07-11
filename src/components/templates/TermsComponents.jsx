import styled from 'styled-components';

const Wrapper = styled.main`
  max-width: 610px;
  margin: 0 auto;
  padding: var(--outer-gap);
  word-break: break-all;
`;

const H1 = styled.h1`
  margin-bottom: var(--row-gap);
  padding-bottom: var(--row-gap--double);
  border-bottom: 1px solid;
  font-size: var(--font-size--large);
`;

const H2 = styled.h2`
  margin-bottom: 8px;
  padding-top: var(--row-gap);
  border-top: 1px solid var(--gray--light);
  font-size: var(--font-size--base);
  &:first-of-type {
    border-top: 0;
    padding-top: 0;
  }
`;

const P = styled.p`
  margin-bottom: var(--row-gap);
  font-size: var(--font-size--small);
  line-height: var(--line-height--content);
`;

const OL = styled.ol`
  margin-bottom: var(--row-gap);
  padding-left: var(--outer-gap);
  list-style: decimal;
`;
const UL = styled.ul`
  margin-bottom: var(--row-gap);
  padding-left: var(--outer-gap);
  list-style: disc;
`;
const LI = styled.li`
  font-size: var(--font-size--small);
  line-height: var(--line-height--content);
  list-style: inherit;
`;

const HR = styled.hr`
  margin: var(--row-gap) 0;
`;

const components = {
  wrapper: Wrapper,
  h1: H1,
  h2: H2,
  p: P,
  ol: OL,
  ul: UL,
  li: LI,
  hr: HR,
};

export default components;
