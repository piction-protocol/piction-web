import 'react-app-polyfill/ie9';

import React from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/browser';

import { CurrentUserProvider } from 'contexts/CurrentUserContext';

import GlobalStyle from 'styles/GlobalStyle';
import i18n from './language/i18n';


import App from './App';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

if (navigator.language === 'ko-KR') {
  i18n.changeLanguage('en');
} else {
  i18n.changeLanguage('kr');
}

render((
  <>
    <GlobalStyle />
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </>
), document.getElementById('app-root'));
