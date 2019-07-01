import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  column-gap: var(--column-gap);
  row-gap: var(--row-gap);
`;

export default Grid;

export const MainGrid = styled(Grid).attrs({
  columns: 'var(--grid-columns)',
})`
  flex: 1;
  max-width: var(--max-width);
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--outer-gap);
  padding-left: var(--outer-gap);
`;

export const SubGrid = styled(Grid)`

`;
