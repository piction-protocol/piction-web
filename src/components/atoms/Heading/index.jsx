import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import media from 'styles/media';

const Styled = {
  Heading: styled.h1`
    font-size: var(--font-size--base);
    font-weight: bold;
    ${media.desktop`
      font-size: var(--font-size--large);
    `}
  `,
};

function Heading({ children, className }) {
  return (
    <Styled.Heading className={className}>
      {children}
      <Helmet>
        <title>{`${children} - Piction`}</title>
      </Helmet>
    </Styled.Heading>
  );
}

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Heading.defaultProps = {
  className: '',
};

export default Heading;
