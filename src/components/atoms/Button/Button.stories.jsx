import React from 'react';
import Button, { PrimaryButton, SecondaryButton, TertiaryButton } from '.';
import docs from './Button.docs.mdx';

export default {
  title: 'Components|Atoms/Button',
  component: Button,
  parameters: {
    docs: { page: docs },
  },
};

export const primary = () => <PrimaryButton>Primary</PrimaryButton>;
export const primaryMini = () => <PrimaryButton size="mini">Primary Mini</PrimaryButton>;
export const secondary = () => <SecondaryButton>Secondary</SecondaryButton>;
export const secondaryMini = () => <SecondaryButton size="mini">Secondary Mini</SecondaryButton>;
export const tertiary = () => <TertiaryButton>Tertiary</TertiaryButton>;
export const tertiaryMini = () => <TertiaryButton size="mini">Tertiary Mini</TertiaryButton>;
