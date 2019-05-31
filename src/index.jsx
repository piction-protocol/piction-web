import React from 'react';
import { render } from 'react-dom';

import GlobalStyle from 'styles/global';

import App from './App';

render((
  <>
    <GlobalStyle />
    <App />
  </>
), document.getElementById('root'));
