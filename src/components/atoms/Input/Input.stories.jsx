import React from 'react';
import Input from '.';
import PasswordInput from './PasswordInput';

export default {
  title: 'Components|Atoms/Input',
  component: Input,
};

export const base = () => <Input />;
export const invalid = () => <Input invalid />;
export const passwordInput = () => <PasswordInput />;
