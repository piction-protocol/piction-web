import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const CurrentUserContext = createContext([{}, () => {}]);

const CurrentUserProvider = ({ value, children }) => {
  const [state, setState] = useState({});
  return (
    <CurrentUserContext.Provider value={[{ ...value, ...state }, setState]}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserProvider };

CurrentUserProvider.propTypes = {
  value: PropTypes.object,
  children: PropTypes.node.isRequired,
};

CurrentUserProvider.defaultProps = {
  value: {},
};
