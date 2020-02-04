import React, { useState } from 'react';
import styled from 'styled-components/macro';

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
  SubmitGroup: styled.div`
    grid-column: 1 / -1;
    padding-top: var(--row-gap);
    border-top: 1px solid var(--gray--light);
  `,
  Submit: styled(PrimaryButton).attrs({
    as: 'input',
    type: 'submit',
  })`
    ${media.mobile`
      width: 100%;
    `}
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await API.user.updatePassword(formData);
      window.location.reload(true);
    } catch (error) {
      setErrorMessage({
        [error.response.data.field]: error.response.data.message,
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
      <Styled.SubmitGroup>
        <Styled.Submit
          value="변경 내용 저장"
        />
      </Styled.SubmitGroup>
    </Styled.Form>
  );
}

export default UpdatePasswordForm;
