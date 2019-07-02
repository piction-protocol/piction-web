import React, { useState } from 'react';
import styled from 'styled-components';

import useCurrentUser from 'hooks/useCurrentUser';
import useAPI from 'hooks/useAPI';
import useForm from 'hooks/useForm';

import Grid from 'styles/Grid';
import media from 'styles/media';

import { PrimaryButton } from 'components/atoms/Button';
import ImageUploader from 'components/atoms/ImageUploader';

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
  ImageGroup: styled(Grid).attrs({
    columns: 'var(--grid-columns)',
  })`
    grid-column: 1 / -1;
    row-gap: 8px;
  `,
  Label: styled.label`
    grid-column: 1 / -1;
    font-weight: bold;
    font-size: var(--font-size--small);
  `,
  Spec: styled.p`
    grid-column: 1 / -1;
    font-size: var(--font-size--small);
    color: var(--gray--dark);
  `,
  ErrorMessage: styled.p`
    grid-column: 1 / -1;
    color: var(--red);
    font-size: var(--font-size--small);
  `,
  ImageUploader: styled(ImageUploader)`
    grid-column: 1 / span 3;
     ${media.desktop`
      grid-column: 1 / span 2;
    `}
  `,
  Submit: styled(PrimaryButton).attrs({
    as: 'input',
    type: 'submit',
  })`
    grid-column: 1 / -1;
  `,
  Notice: styled.span`
    color: var(--blue);
    font-style: normal;
  `,
};

function UpdateUserForm() {
  const { currentUser } = useCurrentUser();
  const [formData, { handleChange }] = useForm({
    username: currentUser.username,
    password: '',
    picture: currentUser.picture,
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [API] = useAPI();

  // 에러 메시지 내용: https://github.com/battleent/piction-api/blob/master/src/main/kotlin/network/piction/api/exceptions/errors/UpdateUserErrors.kt
  const errorStatusTable = {
    4000: 'username',
    4001: 'username',
    4002: 'username',
    4003: 'password',
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const { response } = await API.user.update(formData);
      console.log(response);
    } catch (error) {
      setErrorMessage({
        [errorStatusTable[error.response.data.code]]: error.response.data.message,
      });
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.InputGroup
        name="email"
        label="이메일"
        value={currentUser.email}
        disabled
      />
      <Styled.InputGroup
        name="username"
        label="닉네임"
        placeholder="2자 이상의 닉네임"
        autoComplete="nickname"
        onChange={handleChange}
        errorMessage={errorMessage.username}
        value={formData.username}
      />
      <Styled.ImageGroup>
        <Styled.Label>
          프로필 이미지
        </Styled.Label>
        <Styled.Spec>
          JPG 또는 PNG 파일, 최대 5MB, 권장 사이즈 가로 세로 500px
        </Styled.Spec>
        <Styled.ImageUploader
          name="picture"
          uploadAPI={API.user.uploadPicture}
          onChange={handleChange}
          defaultImage={formData.picture}
        />
      </Styled.ImageGroup>
      <Styled.InputGroup
        name="password"
        label={<Styled.Notice>변경된 내용을 저장하려면 비밀번호 입력 후 저장 버튼을 눌러주세요.</Styled.Notice>}
        placeholder="비밀번호를 입력해주세요"
        type="password"
        autoComplete="new-password"
        onChange={handleChange}
        required
        errorMessage={errorMessage.password || errorMessage.server}
        value={formData.password}
      />
      <Styled.Submit
        value="저장"
      />
    </Styled.Form>
  );
}

export default UpdateUserForm;
