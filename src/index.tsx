import 'react-app-polyfill/ie9';

import React from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/browser';
import { Provider } from 'react-redux';

import GlobalStyle from 'styles/GlobalStyle';

import App from './App';
import store from './store';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

render((
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
), document.getElementById('app-root'));
