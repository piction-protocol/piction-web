import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Styled = {
  Background: styled.div`
    display: flex;
    position: fixed;
    z-index: 10000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .3);
  `,
  Spinner: styled.div`
    display: inline-block;
    width: 64px;
    height: 64px;
    ::after {
      content: " ";
      display: block;
      width: 46px;
      height: 46px;
      margin: 1px;
      border: 5px solid #fff;
      border-radius: 50%;
      border-color: #fff transparent #fff transparent;
      animation: ${spin} 1.2s linear infinite;
    }
  `,
};

function Spinner() {
  return (
    <Styled.Background>
      <Styled.Spinner />
    </Styled.Background>
  );
}

export default Spinner;
