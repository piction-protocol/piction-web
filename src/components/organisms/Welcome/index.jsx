import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import Heading from 'components/atoms/Heading';
import { PrimaryButton } from 'components/atoms/Button';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-flow: column;
  `,
  Button: styled(PrimaryButton).attrs({
    as: Link,
  })`
    margin-top: 16px;
  `,
};

function Welcome() {
  return (
    <Styled.Container>
      <Heading>회원가입이 완료되었습니다.</Heading>
      <Styled.Button to="/">확인</Styled.Button>
    </Styled.Container>
  );
}

export default Welcome;
