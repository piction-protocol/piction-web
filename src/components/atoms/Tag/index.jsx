import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

const StyledTag = styled(Link)`
  padding: 8px 12px;
  border-radius: 8px;
  background-color: var(--gray--light);
  color: var(--black);
`;

const Tag = ({ children, ...props }) => (
  <StyledTag to={children} {...props}>
    {`#${children}`}
  </StyledTag>
);

Tag.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Tag;
