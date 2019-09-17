import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const LayoutContext = createContext([{}, () => { }]);

const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = useState({
    type: 'default',
    data: {},
  });
  return (
    <LayoutContext.Provider value={[layout, setLayout]}>
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutProvider };

LayoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
