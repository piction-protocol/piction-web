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
      <Heading>회원가입 축하</Heading>
      1000PXL 주는 내용 대신 뭐가 들어가나용
      암튼 ㅎㅇㅎㅇ
      <Styled.Button to="/">확인</Styled.Button>
    </Styled.Container>
  );
}

export default Welcome;
