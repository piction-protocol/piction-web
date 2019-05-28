import { css } from 'docz-plugin-css';

export default {
  plugins: [
    css({
      preprocessor: 'postcss',
      cssmodules: false,
    }),
  ],
  menu: [
    'Index',
    'Atoms',
    'Molecules',
    'Organisms',
  ],
  port: 4000,
  htmlContext: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700&display=swap&subset=korean',
        },
      ],
    },
  },
  wrapper: 'documents/Wrapper',
  filterComponents: files => files.filter(filepath => /[w-]*.(js|jsx)$/.test(filepath)),
};
