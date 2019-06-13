import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const CurrentUserContext = createContext([{}, () => {}]);

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserProvider };

CurrentUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
