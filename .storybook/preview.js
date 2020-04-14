import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs, DocsPage, DocsContainer } from '@storybook/addon-knobs';
import GlobalStyle from '../src/styles/GlobalStyle';
import { withPaddings } from 'storybook-addon-paddings';

addDecorator(withPaddings);
addDecorator(withKnobs);

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

addDecorator(storyFn => (
  <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700|Poppins:600&display=swap&subset=korean" />
    <GlobalStyle />
    {storyFn()}
  </>
));
