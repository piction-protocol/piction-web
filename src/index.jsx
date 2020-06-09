import 'react-app-polyfill/ie9';

import React from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/browser';

import { I18nextProvider } from 'react-i18next';


import { CurrentUserProvider } from 'contexts/CurrentUserContext';

import GlobalStyle from 'styles/GlobalStyle';
import i18n from './language/i18n';

import App from './App';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

if (navigator.language === 'ko-KR') {
  console.log('if문으로 들어왔다는 텍스트');
  i18n.changeLanguage('en');
}

render((
  <>
    <GlobalStyle />
    <I18nextProvider i18n={i18n}>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </I18nextProvider>
  </>
), document.getElementById('app-root'));
