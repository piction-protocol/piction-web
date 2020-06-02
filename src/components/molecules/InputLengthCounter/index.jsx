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
    ${({ columns }) => columns && `
      grid-column: span ${columns};
      grid-template-columns: repeat(${columns}, 1fr);
    `}
    display: grid;
    row-gap: 8px;
    column-gap: var(--column-gap);
    margin-bottom: var(--row-gap);
    white-space: nowrap;
  `,
  Spec: styled.p`
    color: var(--gray);
    font-size: var(--font-size--small);
  `,
  LengthCounter: styled.div`
  display: flex;
  grid-row: 2;
  grid-column: 9;
  align-items: center;
  color: var(--gray);
  font-size: var(--font-size--base);
  `,
};

function InputLengthCounter({
  letterContext, maxLength, name, label = null, spec = null, errorMessage = null, className = null, type = 'text', children = null, inputRef, ment, ...props
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
        : (ment === 'reaction' ? <Textarea id={name} name={name} type={type} ref={inputRef} invalid={!!errorMessage} {...props} /> : <Input id={name} name={name} type={type} ref={inputRef} invalid={!!errorMessage} {...props} />)
      }
      <Styled.LengthCounter>
        {letterContext ? `${letterContext.length} / ${maxLength}` : `0 / ${maxLength}`}
      </Styled.LengthCounter>
      {children}
      {errorMessage && (
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
      )}
    </Styled.Group>
  );
}

InputLengthCounter.propTypes = {
  letterContext: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  ment: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  spec: PropTypes.string,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
  inputRef: PropTypes.func,
};

export default InputLengthCounter;
