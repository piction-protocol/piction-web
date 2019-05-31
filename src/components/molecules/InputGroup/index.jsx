import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from 'components/atoms/Input';

const Styled = {
  Group: styled.div`
    display: flex;
    flex-flow: column;
  `,
  Label: styled.label`
    margin-bottom: 8px;
    font-size: var(--font-size--small);
  `,
  ErrorMessage: styled.p`
    margin: 8px 0 0;
    color: var(--red);
    font-size: var(--font-size--small);
  `,
};

const InputGroup = ({
  id, label, errorMessage, ...props
}) => (
  <Styled.Group>
    <Styled.Label htmlFor={id}>{label}</Styled.Label>
    <Input id={id} {...props} />
    {errorMessage && (
      <Styled.ErrorMessage>
        {errorMessage}
      </Styled.ErrorMessage>
    )}
  </Styled.Group>
);

InputGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

InputGroup.defaultProps = {
  errorMessage: '',
};

export default InputGroup;
