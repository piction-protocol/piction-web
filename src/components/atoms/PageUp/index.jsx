import React from 'react';
import styled from 'styled-components/macro';

const Styled = {
  GotoUp: styled.div`
  cursor: pointer;
  `,
};

const scroll = () => {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
};

function PageUp() {
  return (
    <div>
      <Styled.GotoUp className="up" onClick={scroll} role="button">위로가기</Styled.GotoUp>
    </div>
  );
}

export default PageUp;
