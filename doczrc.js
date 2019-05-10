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
};
