import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import useCurrentUser from 'hooks/useCurrentUser';

import { PrimaryButton } from 'components/atoms/Button';

import InputGroup from 'components/molecules/InputGroup';

const Styled = {
  Form: styled.form`
    display: flex;
    flex-flow: column;
    font-size: var(--font-size--small);
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
};

function UpdatePasswordForm() {
  const [userData, setUserData] = useState(() => ({
    password: '',
    newPassword: '',
  }));
  const [errorMessage, setErrorMessage] = useState('');
  const { accessToken } = useCurrentUser();

  // 에러 메시지 내용: https://github.com/battleent/piction-api/blob/master/src/main/kotlin/network/piction/api/exceptions/errors/UpdatePasswordErrors.kt
  const errorStatusTable = {
    4000: 'password',
    4001: 'newPassword',
    4002: 'newPassword',
  };

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setUserData(prevUserData => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: 'patch',
        url: 'http://api-iro.piction.network/users/me/password',
        data: userData,
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': accessToken,
        },
      });
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
        id="password"
        name="password"
        label="현재 비밀번호"
        placeholder="비밀번호를 입력해주세요"
        type="password"
        autoComplete="current-password"
        required
        onChange={handleChange}
        value={userData.password}
        errorMessage={errorMessage.password}
      />
      <Styled.InputGroup
        id="newPassword"
        name="newPassword"
        label="새 비밀번호"
        placeholder="6자 이상의 비밀번호"
        type="password"
        autoComplete="new-password"
        required
        onChange={handleChange}
        value={userData.newPassword}
        errorMessage={errorMessage.newPassword}
      />
      <Styled.Submit
        value="로그인"
      />
    </Styled.Form>
  );
}

export default UpdatePasswordForm;
