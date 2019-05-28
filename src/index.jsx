import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from 'styles/global';

import App from './App';

render((
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>
), document.getElementById('root'));
