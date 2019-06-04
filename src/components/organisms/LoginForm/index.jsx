import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import axios from 'axios';

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
    margin-bottom: 12px;
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

function LoginForm() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const storeAccessToken = (token) => {
    sessionStorage.setItem('access-token', token);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://api-iro.piction.network/sessions',
      data: userData,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      storeAccessToken(response.data.accessToken);
      window.location.href = '/';
    }).catch((error) => {
      setErrorMessage(error.response.data.message);
    });
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Heading>
        로그인
      </Styled.Heading>
      <Styled.InputGroup
        id="email"
        name="email"
        label="이메일"
        placeholder="이메일을 입력해주세요."
        autoComplete="email"
        required
        onChange={handleChange}
        invalid={!!errorMessage}
      />
      <Styled.InputGroup
        id="password"
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        autoComplete="current-password"
        required
        onChange={handleChange}
        errorMessage={errorMessage}
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
}

export default LoginForm;
