import React from 'react';
import { render } from 'react-dom';

import { CurrentUserProvider } from 'context/CurrentUserContext';

import GlobalStyle from 'styles/GlobalStyle';

import App from './App';

render((
  <>
    <GlobalStyle />
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </>
), document.getElementById('root'));
