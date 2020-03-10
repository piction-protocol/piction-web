import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

interface Layout {
  type: 'default' | 'project'
  data?: any
}

interface ILayoutContext {
  layout: Layout,
  setLayout: React.Dispatch<React.SetStateAction<Layout>>
}

const LayoutContext = createContext<ILayoutContext>({
  layout: {
    type: 'default',
    data: {},
  },
  setLayout: () => {},
});

interface LayoutProviderProps {
  children: React.ReactNode
}
const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [layout, setLayout] = useState<Layout>({
    type: 'default',
  });

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutProvider };

LayoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
