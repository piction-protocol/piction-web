import styled, { css } from 'styled-components/macro';

export const GridStyle = css`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  column-gap: var(--column-gap);
  row-gap: var(--row-gap);
`;

const Grid = styled.div`
  ${GridStyle}
`;

export default Grid;

export const MainGrid = styled(Grid).attrs({
  columns: 'var(--grid-columns)',
})`
  width: 100%;
  max-width: var(--max-width);
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--outer-gap);
  padding-left: var(--outer-gap);
`;
