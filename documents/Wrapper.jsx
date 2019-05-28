import React from 'react';
import PropTypes from 'prop-types';

import GlobalStyle from 'styles/global';

const Wrapper = ({ children }) => (
  <React.Fragment>
    <GlobalStyle />
    {children}
  </React.Fragment>
);

export default Wrapper;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
