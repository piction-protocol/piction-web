import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = {
  Heading: styled.h1`
  `,
};

function Heading({ level, children }) {
  return (
    <Styled.Heading as={`h${level}`}>
      {children}
    </Styled.Heading>
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
