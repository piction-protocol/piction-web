import React, { forwardRef, useState } from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as VisibleIcon } from 'images/ic-visibility-on.svg';
import { ReactComponent as InvisibleIcon } from 'images/ic-visibility-off.svg';

import Input from '.';

const Styled = {
  Wrapper: styled.div`
    min-width: 0;
    display: flex;
    position: relative;
    align-items: center;
  `,
  Input: styled(Input)`
    flex: 1;
  `,
  Toggle: styled.div`
    display: flex;
    position: absolute;
    right: 16px;
    cursor: pointer;
  `,
};

const PasswordInput = forwardRef((props, ref) => {
  const [isMasked, setIsMasked] = useState(true);

  return (
    <Styled.Wrapper>
      <Styled.Input ref={ref} {...props} type={isMasked ? 'password' : 'text'} />
      <Styled.Toggle onClick={() => setIsMasked(prev => !prev)}>
        {isMasked
          ? <InvisibleIcon />
          : <VisibleIcon />
        }
      </Styled.Toggle>
    </Styled.Wrapper>
  );
});

export default PasswordInput;
