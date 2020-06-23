import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './translation.en.json';
import translationCh from './translation.ch.json';


const resource = {
  en: {
    translation: translationEn,
  },
  ch: {
    translation: translationCh,
  },
  ko: {
    translation: {
      '~ 이상 이용 가능한 포스트입니다.': '',
      '~ 만 이용 가능한 포스트입니다.': '',
      '나는 동의합니다.': '',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resource,
    lng: 'ko',
    fallbackLng: 'ko',
    // ns: ['translation'],
    // defaultNS: "translation",
    debug: false,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
