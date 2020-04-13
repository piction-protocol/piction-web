import React from 'react';
import { text, number } from '@storybook/addon-knobs';
import ProjectCard from '.';

export default {
  title: 'Components|Molecules/ProjectCard',
  component: ProjectCard,
};

export const WithProject = () => {
  const title = text('title', 'title');
  const thumbnail = text('thumbnail', null);
  const lastPublishedAt = number('lastPublishedAt', null);

  return (
    <ProjectCard
      title={title}
      thumbnail={thumbnail}
      lastPublishedAt={lastPublishedAt}
    />
  );
};

export const Placeholder = () => <ProjectCard.Placeholder />;
