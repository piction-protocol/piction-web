import React, { createContext, useState } from 'react';

interface User {
  email: string
  picture: string
}

interface ICurrentUserContext {
  currentUser: User | undefined,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
}
const CurrentUserContext = createContext<ICurrentUserContext>({
  currentUser: undefined,
  setCurrentUser: () => {},
});

interface CurrentUserProviderProps {
  children: React.ReactNode
}
const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserProvider };
