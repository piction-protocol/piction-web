import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { DocsPage } from '@storybook/addon-docs/blocks';
import GlobalStyle from '../src/styles/GlobalStyle';
import { withPaddings } from 'storybook-addon-paddings';

import sortStories from './sortStories';

addDecorator(withPaddings);
addDecorator(withKnobs);

addParameters({
  paddings: [
    { name: 'space--xs', value: '8px' },
    { name: 'space--s', value: '12px' },
    { name: 'space--m', value: '16px' },
    { name: 'space--l', value: '24px' },
    { name: 'space--xl', value: '32px' },
  ],
  backgrounds: [
    { name: 'white', value: '#FFFFFF', default: true },
    { name: 'gray--pale', value: '#E8E8E8' },
    { name: 'gray', value: '#BABABA' },
    { name: 'black', value: '#000000' },
  ],
  docs: {
    page: DocsPage,
  },
  dependencies: {
    withStoriesOnly: true,
    hideEmpty: true,
  },
  options: {
    storySort: sortStories({
      Introduction: ['Greeting'],
      Guidelines: [],
      Components: [
        'Atoms',
        'Molecules',
        'Organisms'
      ],
    })
  }
});

addDecorator(storyFn => (
  <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700|Poppins:600&display=swap&subset=korean" />
    <GlobalStyle />
    {storyFn()}
  </>
));
