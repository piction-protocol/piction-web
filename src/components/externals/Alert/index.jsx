import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components/macro';

import media from 'styles/media';

const fadeOutKeyframes = keyframes`
  from { opacity: .9; }
  to { opacity: 0; }
`;

const fadeOutAnimation = css`
  500ms ease-in 5000ms forwards ${fadeOutKeyframes}
`;

const Styled = {
  Wrapper: styled.div`
    display: flex;
    position: fixed;
    z-index: 10000;
    top: 74px;
    right: 0;
    left: 0;
    ${media.desktop`
      top: 104px;
    `}
  `,
  Alert: styled.div`
    margin: 0 auto;
    padding: 16px 24px;
    background-color: ${({ isError }) => (isError ? 'var(--red)' : 'var(--blue)')};
    opacity: .9;
    color: var(--white);
    font-size: var(--font-size--small);
    font-weight: bold;
    animation: ${fadeOutAnimation};
  `,
};

function Alert({ isError, children }) {
  const root = document.getElementById('external-root');

  return (
    createPortal((
      <Styled.Wrapper>
        <Styled.Alert isError={isError}>
          {children}
        </Styled.Alert>
      </Styled.Wrapper>
    ), root)
  );
}

Alert.propTypes = {
  isError: PropTypes.bool,
};

Alert.defaultProps = {
  isError: false,
};

export default Alert;
