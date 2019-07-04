export default {
  src: 'src/',
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
  modifyBundlerConfig: (bundlerConfig) => {
    bundlerConfig.module.rules.push({
      test: /.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return bundlerConfig;
  },
};
