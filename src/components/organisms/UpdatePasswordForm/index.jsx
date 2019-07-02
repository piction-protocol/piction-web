import React, { useState } from 'react';
import styled from 'styled-components';

import useAPI from 'hooks/useAPI';
import useForm from 'hooks/useForm';

import Grid from 'styles/Grid';
import media from 'styles/media';

import { PrimaryButton } from 'components/atoms/Button';

import InputGroup from 'components/molecules/InputGroup';

const Styled = {
  Form: styled(Grid).attrs({
    as: 'form',
    columns: 'var(--grid-columns)',
  })`
    font-size: var(--font-size--small);
  `,
  InputGroup: styled(InputGroup)`
    grid-column: 1 / -1;
    ${media.desktop`
      grid-column: 1 / span 3;
      white-space: nowrap;
    `}
  `,
  Submit: styled(PrimaryButton).attrs({
    as: 'input',
    type: 'submit',
  })`
    grid-column: 1 / -1;
  `,
};

function UpdatePasswordForm() {
  const [formData, { handleChange }] = useForm({
    password: '',
    newPassword: '',
    passwordCheck: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [API] = useAPI();

  // 에러 메시지 내용: https://github.com/battleent/piction-api/blob/master/src/main/kotlin/network/piction/api/exceptions/errors/UpdatePasswordErrors.kt
  const errorStatusTable = {
    4000: 'password',
    4001: 'newPassword',
    4002: 'newPassword',
    4003: 'passwordCheck',
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await API.user.updatePassword(formData);
      window.location.reload(true);
    } catch (error) {
      setErrorMessage({
        [errorStatusTable[error.response.data.code]]: error.response.data.message,
      });
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        autoComplete="email"
        style={{
          display: 'none',
        }}
      />
      <Styled.InputGroup
        name="password"
        label="현재 비밀번호"
        placeholder="비밀번호를 입력해주세요"
        type="password"
        autoComplete="current-password"
        required
        onChange={handleChange}
        value={formData.password}
        errorMessage={errorMessage.password}
      />
      <Styled.InputGroup
        name="newPassword"
        label="새 비밀번호"
        placeholder="6자 이상의 비밀번호"
        type="password"
        autoComplete="new-password"
        required
        onChange={handleChange}
        value={formData.newPassword}
        errorMessage={errorMessage.newPassword}
      />
      <Styled.InputGroup
        name="passwordCheck"
        label="비밀번호 확인"
        placeholder="비밀번호 재입력"
        type="password"
        autoComplete="new-password"
        required
        onChange={handleChange}
        value={formData.passwordCheck}
        errorMessage={errorMessage.passwordCheck}
      />
      <Styled.Submit
        value="로그인"
      />
    </Styled.Form>
  );
}

export default UpdatePasswordForm;
