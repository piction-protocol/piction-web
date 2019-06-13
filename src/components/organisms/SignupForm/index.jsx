import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import useCurrentUser from 'hooks/useCurrentUser';

import Heading from 'components/atoms/Heading';
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
  Notice: styled.p`
    margin-bottom: 24px;
    color: var(--gray--dark);
  `,
  Em: styled.em`
    margin: 0 4px;
    color: var(--red);
    font-style: normal;
  `,
};

function SignupForm() {
  const [userData, setUserData] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const { setAccessToken } = useCurrentUser();

  // 에러 메시지 내용: https://github.com/battleent/piction-api/blob/master/src/main/kotlin/network/piction/api/exceptions/errors/SignupErrors.kt
  const errorStatusTable = {
    4000: 'email',
    4001: 'email',
    4002: 'password',
    4003: 'username',
    4004: 'username',
    4005: 'username',
    4006: 'email',
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: 'post',
        url: 'http://api-iro.piction.network/users',
        data: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAccessToken(response.data.accessToken);
    } catch (error) {
      setErrorMessage({
        [errorStatusTable[error.response.data.code]]: error.response.data.message,
      });
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Heading>
        회원가입
      </Styled.Heading>
      <Styled.InputGroup
        id="email"
        name="email"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        autoComplete="email"
        onChange={handleChange}
        required
        errorMessage={errorMessage.email}
      />
      <Styled.InputGroup
        id="password"
        name="password"
        label="비밀번호"
        placeholder="6자 이상의 비밀번호"
        type="password"
        autoComplete="new-password"
        onChange={handleChange}
        required
        errorMessage={errorMessage.password}
      />
      <Styled.InputGroup
        id="username"
        name="username"
        label="닉네임"
        placeholder="2자 이상의 닉네임"
        autoComplete="nickname"
        onChange={handleChange}
        required
        errorMessage={errorMessage.username}
      />
      <Styled.Notice>
        Piction 베타 서비스는 테스트 용도로 운영되며,
        <Styled.Em>
          실제 메인넷 환경의 토큰을 사용하는 것이 아닙니다.
        </Styled.Em>
        테스트 목적에 따라 데이터가 초기화되거나 롤백될 수 있으며, 테스터가 등록한 데이터 손실에 대한 책임은 Piction에서 지지 않습니다.
      </Styled.Notice>
      <Styled.Submit
        value="동의 및 회원가입"
      />
    </Styled.Form>
  );
}

export default SignupForm;
