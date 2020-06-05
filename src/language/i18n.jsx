import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './translation.en.json';

const resource = {
  en: {
    translation: translationEn,
  },
  kr: {
    translation: {},
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resource,
    lng: 'en',
    fallbackLng: 'en',
    // ns: ['translation'],
    // defaultNS: "translation",
    debug: true,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
