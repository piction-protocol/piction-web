import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-column: span ${({ columns }) => columns};
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  column-gap: var(--gap);
  row-gap: var(--row-gap);
`;

const Grid = ({ columns, children }) => (
  <Container columns={columns}>
    {children.map(child => (
      child
    ))}
  </Container>
);

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.number,
};

Grid.defaultProps = {
  columns: 12,
};

export default Grid;
