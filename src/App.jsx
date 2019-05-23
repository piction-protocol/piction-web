import React from 'react';
import { Route } from 'react-router-dom';

import { StateProvider } from 'context/state';

import HomePage from 'pages/HomePage';

function App() {
  const initialState = {};

  const reducer = () => {

  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Route exact path="/" component={HomePage} />
    </StateProvider>
  );
}

export default App;
