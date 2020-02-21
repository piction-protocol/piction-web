import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { ReactComponent as CheckedIcon } from 'images/ic-checked-circle.svg';

const Styled = {
  Radio: styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 190px;
    height: 190px;
    background-color: ${({ checked }) => (checked ? 'var(--blue)' : 'var(--gray--light)')};
    cursor: pointer;
    color: var(--white);
  `,
  CheckedIcon: styled(CheckedIcon)`
    position: absolute;
    top: 10px;
    right: 10px;
  `,
  Input: styled.input.attrs({
    type: 'radio',
  })`
    visibility: hidden;
  `,
};

function RadioWithImage({
  children, className, checked, ...props
}) {
  return (
    <Styled.Radio checked={checked} className={className}>
      <Styled.Input checked={checked} {...props} />
      {checked && (
        <Styled.CheckedIcon />
      )}
      {children}
    </Styled.Radio>
  );
}

RadioWithImage.propTypes = {
  children: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

RadioWithImage.defaultProps = {
  className: '',
};

export default RadioWithImage;
