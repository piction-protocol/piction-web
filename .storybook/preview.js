import React from 'react';
import { addDecorator } from '@storybook/react';
import GlobalStyle from '../src/styles/GlobalStyle';

addDecorator(storyFn => (
  <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700|Poppins:600&display=swap&subset=korean" />
    <GlobalStyle />
    {storyFn()}
  </>
));
