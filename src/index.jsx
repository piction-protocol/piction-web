import 'react-app-polyfill/ie9';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import { CurrentUserProvider } from 'context/CurrentUserContext';

import GlobalStyle from 'styles/GlobalStyle';

import App from './App';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

render((
  <>
    <GlobalStyle />
    <CurrentUserProvider>
      <Router>
        <App />
      </Router>
    </CurrentUserProvider>
  </>
), document.getElementById('app-root'));
