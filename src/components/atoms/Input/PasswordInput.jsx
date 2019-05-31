import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as VisibleIcon } from 'images/ic-visibility-on.svg';
import { ReactComponent as InvisibleIcon } from 'images/ic-visibility-off.svg';

import Input from '.';

const Styled = {
  Wrapper: styled.div`
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

function PasswordInput(props) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Styled.Wrapper>
      <Styled.Input {...props} type={isVisible ? 'password' : 'text'} />
      <Styled.Toggle onClick={() => setIsVisible(visibility => !visibility)}>
        {isVisible
          ? <VisibleIcon />
          : <InvisibleIcon />
        }
      </Styled.Toggle>
    </Styled.Wrapper>
  );
}

export default PasswordInput;
