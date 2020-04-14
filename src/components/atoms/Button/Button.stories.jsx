import React from 'react';
import { PrimaryButton, SecondaryButton, TertiaryButton } from '.';

export default {
  title: 'Components|Atoms/Button',
};

export const all = () => (
  <>
    <PrimaryButton>Primary</PrimaryButton>
    <PrimaryButton size="mini">Primary Mini</PrimaryButton>
    <SecondaryButton>Secondary</SecondaryButton>
    <SecondaryButton size="mini">Secondary Mini</SecondaryButton>
    <TertiaryButton>Tertiary</TertiaryButton>
    <TertiaryButton size="mini">Tertiary Mini</TertiaryButton>
  </>
);

export const primary = () => <PrimaryButton>Primary</PrimaryButton>;
export const primaryMini = () => <PrimaryButton size="mini">Primary Mini</PrimaryButton>;
export const secondary = () => <SecondaryButton>Secondary</SecondaryButton>;
export const secondaryMini = () => <SecondaryButton size="mini">Secondary Mini</SecondaryButton>;
export const tertiary = () => <TertiaryButton>Tertiary</TertiaryButton>;
export const tertiaryMini = () => <TertiaryButton size="mini">Tertiary Mini</TertiaryButton>;
