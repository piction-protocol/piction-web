module.exports = {
  stories: ['../src/**/*.stories.(jsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-knobs/register',
    '@storybook/addon-docs',
    '@storybook/addon-backgrounds',
    'storybook-addon-paddings',
  ],
};
