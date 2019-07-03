import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate } from '@reach/router';

import useAPI from 'hooks/useAPI';
import useForm from 'hooks/useForm';

import Grid from 'styles/Grid';

import InputGroup from 'components/molecules/InputGroup';
import Heading from 'components/atoms/Heading';
import Label from 'components/atoms/Label';
import ImageUploader from 'components/atoms/ImageUploader';
import { PrimaryButton } from 'components/atoms/Button';

import dummyWideThumbnailImage from 'images/img-dummy-1440x450.jpg';
import dummyThumbnailImage from 'images/img-dummy-500x500.jpg';

const Styled = {
  Form: styled(Grid).attrs({
    as: 'form',
    columns: 9,
  })`
    padding: 24px 0 48px;
    font-size: var(--font-size--small);
    > * {
      grid-column: 1 / -1;
    }
  `,
  InputGroup: styled(InputGroup)`
    ${({ columns }) => columns && `grid-column: span ${columns};`}
    white-space: nowrap;
  `,
  ImageGroup: styled(Grid).attrs({
    columns: 9,
  })`
    grid-column: 1 / -1;
    row-gap: 8px;
    > * {
      grid-column: 1 / -1;
    }
  `,
  ImageUploader: styled(ImageUploader)`
    ${({ columns }) => columns && `grid-column: span ${columns};`}
  `,
  Preview: styled.p`
    color: var(--blue);
  `,
  Spec: styled.p`
    font-size: var(--font-size--small);
    color: var(--gray--dark);
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
  `,
};

function ProjectForm({ title, projectId, setProjects }) {
  const [formData, { setFormData, handleChange }] = useForm({
    title: '',
    uri: '',
    synopsis: '',
    thumbnail: '',
    wideThumbnail: '',
    subscriptionPrice: 0,
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [API] = useAPI();

  // 에러 메시지 내용: https://github.com/battleent/piction-api/blob/master/src/main/kotlin/network/piction/api/exceptions/errors/CreateProjectErrors.kt
  const errorStatusTable = {
    4000: 'uri',
    4001: 'title',
    4002: 'uri',
    4003: 'title',
    4004: 'synopsis',
    4005: 'uri',
    4006: 'subscriptionPrice',
    4007: 'subscriptionPrice',
  };

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const result = await API.project.get({ projectId });
        setFormData(result.data);
      } catch (error) {
        console.log(error.response.message);
      }
    };
    if (projectId) getProjectData();
    // eslint-disable-next-line
  }, [setFormData, projectId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (projectId) {
        await API.project.update({ ...formData, projectId });
        window.location.reload(true);
      } else {
        await API.project.create(formData);
        setProjects(prevState => ([
          ...prevState,
          {
            title: formData.title,
            uri: formData.uri,
          },
        ]));
        navigate(`${formData.uri}/posts`);
      }
    } catch (error) {
      setErrorMessage({
        [errorStatusTable[error.response.data.code]]: error.response.data.message,
      });
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Heading>{title}</Heading>
      <Styled.InputGroup
        name="title"
        label="프로젝트 제목"
        placeholder="프로젝트 제목을 입력해주세요."
        onChange={handleChange}
        value={formData.title}
        required
        errorMessage={errorMessage.title}
      />
      <Styled.InputGroup
        name="uri"
        label="프로젝트 ID"
        spec="영문 소문자, 숫자, 대시(-)만 입력 가능, 수정 불가"
        onChange={handleChange}
        disabled={projectId}
        value={formData.uri}
        required
        errorMessage={errorMessage.uri}
      >
        {projectId ? (
          <Styled.Spec>
            수정이 불가능한 항목입니다.
          </Styled.Spec>
        ) : (
          <Styled.Preview>
            프로젝트 주소 : https://piction.network/project/
            {formData.uri}
          </Styled.Preview>
        )}
      </Styled.InputGroup>
      <Styled.ImageGroup>
        <Label>
          프로젝트 대표 이미지
        </Label>
        <Styled.Spec>
          JPG 또는 PNG 파일, 최대 5MB, 권장 사이즈 1440*450 px
        </Styled.Spec>
        <Styled.ImageUploader
          name="wideThumbnail"
          ratio={1440 / 450}
          defaultImage={formData.wideThumbnail}
          backgroundImage={dummyWideThumbnailImage}
          onChange={handleChange}
          uploadAPI={API.project.uploadWideThumbnail}
          columns={3}
        />
      </Styled.ImageGroup>
      <Styled.ImageGroup>
        <Styled.Spec>
          JPG 또는 PNG 파일, 최대 5MB, 권장 사이즈 500*500 px
        </Styled.Spec>
        <Styled.ImageUploader
          name="thumbnail"
          ratio={500 / 500}
          defaultImage={formData.thumbnail}
          backgroundImage={dummyThumbnailImage}
          onChange={handleChange}
          uploadAPI={API.project.uploadThumbnail}
          columns={2}
        />
      </Styled.ImageGroup>
      <InputGroup
        name="synopsis"
        label="시놉시스"
        placeholder="프로젝트와 작품에 대한 설명 텍스트를 한 줄로 출력합니다."
        onChange={handleChange}
        value={formData.synopsis}
        errorMessage={errorMessage.synopsis}
      />
      <InputGroup
        name="subscriptionPrice"
        label="유료 멤버십 가격"
        placeholder="프로젝트와 작품에 대한 설명 텍스트를 한 줄로 출력합니다."
        value={0}
        disabled
        errorMessage={errorMessage.subscriptionPrice}
      >
        <Styled.Spec>
          PXL 토큰이 정식으로 유통된 후에 설정 가능합니다.
        </Styled.Spec>
      </InputGroup>
      <Styled.SubmitGroup>
        <Styled.Submit
          value={projectId ? '저장' : '프로젝트 생성'}
        />
      </Styled.SubmitGroup>
    </Styled.Form>
  );
}

ProjectForm.propTypes = {
  projectId: PropTypes.string,
  title: PropTypes.string.isRequired,
  setProjects: PropTypes.func,
};

ProjectForm.defaultProps = {
  projectId: '',
  setProjects: () => {},
};

export default ProjectForm;
