import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import {
  text, number, boolean, select,
} from '@storybook/addon-knobs';
import PostItem from '.';

export default {
  title: 'Components|Molecules/PostItem',
  component: PostItem,
};

export const WithPost = () => {
  const viewType = select('viewType', ['CARD', 'LIST'], 'CARD');
  const title = text('title', 'title');
  const likeCount = number('likeCount', 1);
  const isLocked = boolean('isLocked', false);
  const cover = text('cover', 'https://placekitten.com/1000/1000');

  const post = {
    title, likeCount, viewType, isLocked, cover,
  };

  return (
    <ThemeProvider theme={{ viewType }}>
      <PostItem {...post} />
    </ThemeProvider>
  );
};

export const Placeholder = () => {
  const viewType = select('viewType', ['CARD', 'LIST'], 'CARD');
  return (
    <ThemeProvider theme={{ viewType }}>
      <PostItem.Placeholder />
    </ThemeProvider>
  );
};
