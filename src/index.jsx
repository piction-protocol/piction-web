import 'react-app-polyfill/ie9';

import React from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/browser';

import { CurrentUserProvider } from 'contexts/CurrentUserContext';

import GlobalStyle from 'styles/GlobalStyle';
import './language/i18n';


import App from './App';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

render((
  <>
    <GlobalStyle />
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </>
), document.getElementById('app-root'));
