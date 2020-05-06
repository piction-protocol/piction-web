import React from 'react';
import {
  text,
} from '@storybook/addon-knobs';
import MembershipBanner from '.';

export default {
  title: 'Components|Molecules/MembershipBanner',
  component: MembershipBanner,
};

export const base = () => {
  const userName = text('userName', 'userName');
  return (
    <MembershipBanner userName={userName} />
  );
};
