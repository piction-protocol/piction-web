import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-column: span ${({ columns }) => columns};
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  column-gap: var(--gap);
  row-gap: var(--row-gap);
`;

const Item = styled(({ children, className }) => cloneElement(React.Children.only(children), {
  className: `${children.props.className || ''} ${className}`,
}))`
  grid-column: span ${({ columns }) => columns};
`;

const Grid = ({ columns, children }) => (
  <Container columns={columns}>
    {Children.map(children, child => (
      <Item columns={child.props.columns || columns}>
        {child}
      </Item>
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
