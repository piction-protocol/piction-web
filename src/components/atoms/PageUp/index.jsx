import React from 'react';
import styled from 'styled-components/macro';

import media from 'styles/media';

import { ReactComponent as UpwardIcon } from 'images/ic-arrow-upward.svg';

const Styled = {
  // FIXME : grid, margin등의 위치 제어용 스타일 분리
  Button: styled.button`
    display: flex;
    position: sticky;
    grid-column: -2 / -1;
    bottom: 24px;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-top: auto;
    margin-left: auto;
    box-shadow: 0 2px 20px 0 var(--shadow-color);
    border: 1px solid var(--gray--pale);
    background-color: var(--white);
    color: var(--gray);
    ${media.desktop`
      bottom: 40px;
    `}
  `,
};

function PageUp() {
  const scrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <Styled.Button onClick={scrollToTop} role="button">
      <UpwardIcon />
    </Styled.Button>
  );
}

export default PageUp;
