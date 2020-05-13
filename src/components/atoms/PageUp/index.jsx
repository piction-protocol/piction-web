import React from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as upButton } from './ic-arrow-upward.svg';

const Styled = {
  GotoUp: styled.div`
  cursor: pointer;
  display: flex;
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15);
  border: solid 1px #e8e8e8;
  background-color: var(--white);
  `,
  upButton: styled(upButton)`
  width: 28px;
  height: 28px;
  object-fit: contain;
  `,
};

function PageUp() {
  const upscroll = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Styled.GotoUp className="up" onClick={upscroll} role="button" title="위로 올라가기"><Styled.upButton /></Styled.GotoUp>
    </div>
  );
}

export default PageUp;
