module.exports = {
  stories: ['../src/**/*.stories.(jsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-knobs/register',
    '@storybook/addon-backgrounds',
    'storybook-addon-paddings',
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true },
    }
  ],
};
