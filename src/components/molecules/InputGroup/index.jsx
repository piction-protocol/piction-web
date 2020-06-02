import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Label from 'components/atoms/Label';
import Input from 'components/atoms/Input';
import Textarea from 'components/atoms/Textarea';
import PasswordInput from 'components/atoms/Input/PasswordInput';
import ErrorMessage from 'components/atoms/ErrorMessage';

const Styled = {
  Group: styled.div`
    display: grid;
    row-gap: 8px;
  `,
  Spec: styled.p`
    color: var(--gray);
    font-size: var(--font-size--small);
  `,
};

function InputGroup({
  name, label = null, spec = null, errorMessage = null, className = null, type = 'text', children = null, inputRef, contentForm, ...props
}) {
  return (
    <Styled.Group className={className}>
      {label && (
        <Label htmlFor={name}>{label}</Label>
      )}
      {spec && (
        <Styled.Spec>{spec}</Styled.Spec>
      )}
      {type === 'password'
        ? <PasswordInput id={name} name={name} ref={inputRef} invalid={!!errorMessage} {...props} />
        : (contentForm === 'reaction' ? <Textarea id={name} name={name} type={type} ref={inputRef} invalid={!!errorMessage} {...props} /> : <Input id={name} name={name} type={type} ref={inputRef} invalid={!!errorMessage} {...props} />)
      }
      {children}
      {errorMessage && (
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
      )}
    </Styled.Group>
  );
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  spec: PropTypes.string,
  contentForm: PropTypes.string,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
  inputRef: PropTypes.func,
};

export default InputGroup;
