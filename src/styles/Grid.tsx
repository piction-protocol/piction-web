import styled, { css } from 'styled-components/macro';

interface GridStyleProps {
  columns?: number 
}
export const GridStyle = css<GridStyleProps>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 'var(--grid-columns)' }) => columns}, minmax(0, 1fr));
  column-gap: var(--column-gap);
  row-gap: var(--row-gap);
`;

const Grid = styled.div`
  ${GridStyle}
`;

export default Grid;

export const MainGrid = styled(Grid)`
  width: 100%;
  max-width: var(--max-width);
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--outer-gap);
  padding-left: var(--outer-gap);
`;
