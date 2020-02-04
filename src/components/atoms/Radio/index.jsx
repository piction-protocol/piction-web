import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Styled = {
  Radio: styled.label`
    display: flex;
    align-items: center;
    font-size: var(--font-size--small);
  `,
  Input: styled.input.attrs({
    type: 'radio',
  })`
    appearance: none;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    border: 2px solid var(--gray--dark);
    border-radius: 50%;
    background-color: var(--white);
    transition: border var(--transition--form);

    &:checked {
      border: 4px solid var(--blue);
    }
  `,
};

function Radio({ children, className, ...props }) {
  return (
    <Styled.Radio className={className}>
      <Styled.Input {...props} />
      {children}
    </Styled.Radio>
  );
}

Radio.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Radio.defaultProps = {
  className: '',
};

export default Radio;
