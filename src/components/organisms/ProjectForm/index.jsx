import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import useCurrentUser from 'hooks/useCurrentUser';
import useForm from 'hooks/useForm';

import InputGroup from 'components/molecules/InputGroup';
import ImageUploader from 'components/atoms/ImageUploader';
import { PrimaryButton } from 'components/atoms/Button';

import dummyWideThumbnailImage from 'images/img-dummy-1440x450.jpg';
import dummyThumbnailImage from 'images/img-dummy-500x500.jpg';

const Styled = {
  Form: styled.form`
    font-size: var(--font-size--small);
  `,
};

function ProjectForm() {
  const [formData, { handleChange }] = useForm();
  const { accessToken } = useCurrentUser();

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: 'post',
        url: 'http://api-iro.piction.network/projects',
        data: formData,
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': accessToken,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log();
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <InputGroup
        name="title"
        label="프로젝트 제목"
        placeholder="프로젝트 제목을 입력해주세요."
        onChange={handleChange}
      />
      <InputGroup
        name="uri"
        label="프로젝트 ID"
        onChange={handleChange}
      />
      프로젝트 대표 이미지
      <ImageUploader
        name="wideThumbnail"
        ratio={1440 / 450}
        backgroundImage={dummyWideThumbnailImage}
        onChange={handleChange}
        url="http://api-iro.piction.network/projects/wide-thumbnail"
      />
      <ImageUploader
        name="thumbnail"
        ratio={500 / 500}
        backgroundImage={dummyThumbnailImage}
        onChange={handleChange}
        url="http://api-iro.piction.network/projects/thumbnail"
      />
      <InputGroup
        name="synopsis"
        label="시놉시스"
        placeholder="프로젝트와 작품에 대한 설명 텍스트를 한 줄로 출력합니다."
        onChange={handleChange}
      />
      <InputGroup
        name="subscriptionPrice"
        label="유료 멤버십 가격"
        placeholder="0"
        onChange={handleChange}
      />
      <PrimaryButton
        as="input"
        type="submit"
        value="저장"
      />
    </Styled.Form>
  );
}

export default ProjectForm;
