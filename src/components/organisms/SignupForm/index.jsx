import React, { useState } from 'react';
import styled from 'styled-components';

import { navigate } from '@reach/router';

import useForm from 'hooks/useForm';
import useAPI from 'hooks/useAPI';

import Heading from 'components/atoms/Heading';
import Checkbox from 'components/atoms/Checkbox';
import { PrimaryButton } from 'components/atoms/Button';
import Spinner from 'components/atoms/Spinner';

import InputGroup from 'components/molecules/InputGroup';

const Styled = {
  Form: styled.form`
    display: flex;
    flex-flow: column;
    font-size: var(--font-size--small);
  `,
  Heading: styled(Heading)`
    margin-bottom: 24px;
    text-align: center;
  `,
  InputGroup: styled(InputGroup)`
    margin-bottom: 24px;
  `,
  Checkbox: styled(Checkbox)`
    margin-right: 8px;
  `,
  Terms: styled.label`
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    margin-bottom: 16px;
    color: var(--gray--dark);
    white-space: pre-wrap;
  `,
  Link: styled.a.attrs({
    target: '_blank',
  })`
    color: var(--blue);
  `,
  Submit: styled(PrimaryButton).attrs({
    as: 'input',
    type: 'submit',
  })`
    width: 100%;
    margin-bottom: 24px;
  `,
};

function SignupForm() {
  const [formData, { handleChange }] = useForm({
    loginId: '',
    email: '',
    password: '',
    passwordCheck: '',
    username: '',
    agree: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [API] = useAPI();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await API.user.create(formData);
      API.token.create(response.data.accessToken);
      navigate('/signup/welcome', { replace: true });
    } catch (error) {
      setErrorMessage({
        [error.response.data.field]: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Heading>
        회원가입
      </Styled.Heading>
      <Styled.InputGroup
        name="loginId"
        label="아이디"
        placeholder="5자 이상 15자 미만"
        autoComplete="username"
        onChange={handleChange}
        required
        errorMessage={errorMessage.loginId}
      />
      <Styled.InputGroup
        name="email"
        label="이메일"
        placeholder="example@gmail.com"
        autoComplete="email"
        onChange={handleChange}
        required
        errorMessage={errorMessage.email}
      />
      <Styled.InputGroup
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
        name="passwordCheck"
        label="비밀번호 재입력"
        placeholder="비밀번호 재입력"
        type="password"
        autoComplete="new-password"
        onChange={handleChange}
        required
        errorMessage={errorMessage.passwordCheck}
      />
      <Styled.InputGroup
        name="username"
        label="닉네임"
        placeholder="2자 이상의 닉네임"
        autoComplete="username"
        onChange={handleChange}
        required
        errorMessage={errorMessage.username}
      />
      <Styled.Terms>
        <Styled.Checkbox
          name="agree"
          onChange={handleChange}
          checked={formData.agree}
          required
        />
        <Styled.Link href="/terms">서비스 이용약관</Styled.Link>
        {' 및 '}
        <Styled.Link href="/privacy">개인정보 처리방침</Styled.Link>
        에 동의합니다.
      </Styled.Terms>
      <Styled.Submit
        value="동의 및 회원가입"
      />
      {isLoading && <Spinner />}
    </Styled.Form>
  );
}

export default SignupForm;
