import React, { useState } from 'react';
import styled from 'styled-components/macro';

import useCurrentUser from 'hooks/useCurrentUser';
import useAPI from 'hooks/useAPI';
import useForm from 'hooks/useForm';

import Grid from 'styles/Grid';
import media from 'styles/media';

import DefaultPicture from 'images/img-user-profile.svg';

import InputGroup from 'components/molecules/InputGroup';
import { PrimaryButton } from 'components/atoms/Button';
import ImageUploader from 'components/atoms/ImageUploader';


const Styled = {
  Form: styled(Grid).attrs({
    as: 'form',
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
  ImageGroup: styled(Grid)`
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
    color: var(--gray);
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
  SubmitGroup: styled.div`
    grid-column: 1 / -1;
    padding-top: var(--row-gap);
    border-top: 1px solid var(--gray--pale);
  `,
  Submit: styled(PrimaryButton).attrs({
    as: 'input',
    type: 'submit',
  })`
    ${media.mobile`
      width: 100%;
    `}
  `,
  Notice: styled.span`
    color: var(--blue);
    font-style: normal;
  `,
};

function UpdateUserForm() {
  const { currentUser } = useCurrentUser();
  const [formData, { handleChange }] = useForm({
    email: currentUser.email,
    username: currentUser.username,
    password: '',
    picture: '',
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [API] = useAPI();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await API.user.update(formData);
      window.location.reload(true);
    } catch (error) {
      setErrorMessage({
        [error.response.data.field]: error.response.data.message,
      });
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.InputGroup
        name="email"
        label="이메일"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
        errorMessage={errorMessage.email}
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
          defaultImage={currentUser.picture}
          backgroundImage={DefaultPicture}
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
      <Styled.SubmitGroup>
        <Styled.Submit
          value="변경 내용 저장"
        />
      </Styled.SubmitGroup>
    </Styled.Form>
  );
}

export default UpdateUserForm;
