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
  filterComponents: files => files.filter(filepath => /[w-]*.(js|jsx)$/.test(filepath)),
};
