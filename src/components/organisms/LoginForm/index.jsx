import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import Heading from 'components/atoms/Heading';
import Checkbox from 'components/atoms/Checkbox';
import { PrimaryButton } from 'components/atoms/Button';

import InputGroup from 'components/molecules/InputGroup';

const Styled = {
  Form: styled.form`
    display: flex;
    flex-flow: column;
    padding: 24px;
    font-size: var(--font-size--small);
  `,
  Heading: styled(Heading)`
    margin-bottom: 24px;
    text-align: center;
  `,
  InputGroup: styled(InputGroup)`
    margin-bottom: 24px;
  `,
  Submit: styled(PrimaryButton).attrs({
    as: 'input',
    type: 'submit',
  })`
    width: 100%;
    margin-bottom: 24px;
  `,
  Checkbox: styled(Checkbox)`
    margin-right: 8px;
  `,
  RememberMe: styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  `,
  Signup: styled.p`
    display: flex;
    margin: auto;
  `,
  Link: styled(Link)`
    margin-left: 4px;
    color: var(--blue);
  `,
};

const LoginForm = () => (
  <Styled.Form>
    <Styled.Heading>
      로그인
    </Styled.Heading>
    <Styled.InputGroup
      id="email"
      label="이메일"
      placeholder="이메일을 입력해주세요."
    />
    <Styled.InputGroup
      id="password"
      label="비밀번호"
      placeholder="비밀번호를 입력해주세요."
      type="password"
    />
    <Styled.RememberMe>
      <Styled.Checkbox />
      로그인 상태 유지
    </Styled.RememberMe>
    <Styled.Submit
      value="로그인"
    />
    <Styled.Signup>
      Piction에 처음 오셨다면,
      <Styled.Link to="/signup">
        회원가입
      </Styled.Link>
    </Styled.Signup>
  </Styled.Form>
);

export default LoginForm;
