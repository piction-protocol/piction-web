import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import useCurrentUser from 'hooks/useCurrentUser';

import { PrimaryButton } from 'components/atoms/Button';
import ImageUploader from 'components/atoms/ImageUploader';

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
  Label: styled.label`
    margin-bottom: 8px;
    font-size: var(--font-size--small);
  `,
  Spec: styled.p`
    margin-bottom: 8px;
    font-size: var(--font-size--small);
    color: var(--gray--dark);
  `,
  ErrorMessage: styled.p`
    margin: 8px 0 0;
    color: var(--red);
    font-size: var(--font-size--small);
  `,
  ImageUploader: styled(ImageUploader)`
    margin-bottom: 24px;
  `,
  Submit: styled(PrimaryButton).attrs({
    as: 'input',
    type: 'submit',
  })`
    width: 100%;
    margin-bottom: 24px;
  `,
  Notice: styled.span`
    color: var(--blue);
    font-style: normal;
  `,
};

function UpdateUserForm() {
  const { currentUser, accessToken } = useCurrentUser();
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    const { email, username, picture } = currentUser;
    setUserData({
      email,
      username,
      picture,
      password: '',
    });
  }, [currentUser]);

  const [errorMessage, setErrorMessage] = useState({});

  // 에러 메시지 내용: https://github.com/battleent/piction-api/blob/master/src/main/kotlin/network/piction/api/exceptions/errors/UpdateUserErrors.kt
  const errorStatusTable = {
    4000: 'email',
    4001: 'email',
    4002: 'username',
    4003: 'username',
    4004: 'password',
    4005: 'picture',
    5000: 'server',
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: 'put',
      url: 'http://api-iro.piction.network/users/me',
      data: userData,
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      setErrorMessage({
        [errorStatusTable[error.response.data.code]]: error.response.data.message,
      });
    });
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.InputGroup
        id="email"
        name="email"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        autoComplete="email"
        onChange={handleChange}
        errorMessage={errorMessage.email}
        value={userData.email}
      />
      <Styled.InputGroup
        id="username"
        name="username"
        label="닉네임"
        placeholder="2자 이상의 닉네임"
        autoComplete="nickname"
        onChange={handleChange}
        errorMessage={errorMessage.username}
        value={userData.username}
      />
      <Styled.Label>
        프로필 이미지
      </Styled.Label>
      <Styled.Spec>
        JPG 또는 PNG 파일, 최대 5MB, 권장 사이즈 가로 세로 500px
      </Styled.Spec>
      <Styled.ImageUploader
        onChange={handleChange}
        defaultImage={userData.picture}
      />
      <Styled.InputGroup
        id="password"
        name="password"
        label={<Styled.Notice>변경된 내용을 저장하려면 비밀번호 입력 후 저장 버튼을 눌러주세요.</Styled.Notice>}
        placeholder="비밀번호를 입력해주세요"
        type="password"
        autoComplete="new-password"
        onChange={handleChange}
        required
        errorMessage={errorMessage.password || errorMessage.server}
        value={userData.password}
      />
      <Styled.Submit
        value="저장"
      />
    </Styled.Form>
  );
}

export default UpdateUserForm;
