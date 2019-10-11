import styled from 'styled-components';

const MainGrid = styled.div`
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 20px;
  row-gap: 24px;
  width: 100%;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 20px;
  padding-left: 20px;
`;

export default MainGrid;
