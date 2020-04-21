import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const StyledTag = styled(Link)`
  padding: 8px 12px;
  border-radius: 8px;
  background-color: var(--gray--light);
  color: var(--black);
  font-size: var(--font-size--small);
`;

const Tag = ({ children, name = children, ...props }) => (
  <StyledTag to={`/tag/${name}`} {...props}>
    #
    {children}
  </StyledTag>
);

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
};

export default Tag;
