import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = {
  Heading: styled.h1`
  `,
};

function Heading({ level, ...props }) {
  return (
    <Styled.Heading as={`h${level}`} {...props} />
  );
}

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
};

Heading.defaultProps = {
  level: 1,
};

export default Heading;
