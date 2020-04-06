import React from 'react';
import { PrimaryButton, SecondaryButton, TertiaryButton } from '.';

export default {
  title: 'Atoms/Button',
};

export const primary = () => <PrimaryButton>Primary</PrimaryButton>;
export const secondary = () => <SecondaryButton>Secondary</SecondaryButton>;
export const tertiary = () => <TertiaryButton>Tertiary</TertiaryButton>;
