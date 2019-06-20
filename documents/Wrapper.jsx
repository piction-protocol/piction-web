import React from 'react';
import PropTypes from 'prop-types';

import GlobalStyle from 'styles/GlobalStyle';

const Wrapper = ({ children }) => (
  <>
    <GlobalStyle />
    {children}
  </>
);

export default Wrapper;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
