import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components/macro';

const fadeOutKeyframes = keyframes`
  from {
    top: 30px;
    opacity: 0;
  }
  10.5% {
    top: 60px;
    opacity: 1;
  }
  89.5% {
    top: 60px;
    opacity: 1;
  }
  to {
    top: 90px;
    opacity: 0;
  }
`;

const fadeOutAnimation = css`
  3800ms ease-in 1 both ${fadeOutKeyframes}
`;

const palette = {
  base: 'var(--charcoal-black)',
  error: 'var(--red--dark)',
  success: 'var(--blue)',
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    position: fixed;
    z-index: 10000;
    top: 60px;
    right: 0;
    left: 0;
    animation: ${fadeOutAnimation};
  `,
  Alert: styled.div`
    margin: 0 auto;
    padding: 16px 24px;
    background-color: var(--white);
    border-top: 5px solid;
    border-color: ${({ type }) => palette[type]};
    box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.15);
    color: var(--black);
    font-size: var(--font-size--small);
    font-weight: bold;
  `,
};

function Alert({ type = 'base', children }) {
  const root = document.getElementById('external-root');

  return (
    createPortal((
      <Styled.Wrapper>
        <Styled.Alert type={type}>
          {children}
        </Styled.Alert>
      </Styled.Wrapper>
    ), root)
  );
}

Alert.propTypes = {
  type: PropTypes.string,
};

export default Alert;
