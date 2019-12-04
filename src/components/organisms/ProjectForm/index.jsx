import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import queryString from 'query-string';

import useAPI from 'hooks/useAPI';
import useForm from 'hooks/useForm';

import Grid from 'styles/Grid';

import InputGroup from 'components/molecules/InputGroup';
import TagsInput from 'components/molecules/TagsInput';
import Heading from 'components/atoms/Heading';
import Label from 'components/atoms/Label';
import ErrorMessage from 'components/atoms/ErrorMessage';
import ImageUploader from 'components/atoms/ImageUploader';
import Checkbox from 'components/atoms/Checkbox';
import { PrimaryButton } from 'components/atoms/Button';

import dummyWideThumbnailImage from 'images/img-dummy-1440x450.jpg';
import dummyThumbnailImage from 'images/img-dummy-500x500.jpg';

const Styled = {
  Form: styled(Grid).attrs({
    as: 'form',
    columns: 9,
  })`
    flex: 1;
    align-self: flex-start;
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
  Description: styled.p`
    color: var(--blue);
  `,
  Spec: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    a {
      color: var(--blue);
      text-decoration: underline;
    }
  `,
  CheckboxGroup: styled.label`
    display: flex;
    align-items: center;
  `,
  Checkbox: styled(Checkbox)`
    margin-right: 8px;
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

function ProjectForm({
  title,
  projectId = '',
  setProjects,
  location: { search },
}) {
  const [formData, { setFormData, handleChange }] = useForm({
    title: '',
    uri: '',
    synopsis: '',
    thumbnail: '',
    wideThumbnail: '',
    tags: [],
    subscriptionPrice: 0,
  });
  const [defaultImage, setDefaultImage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const { data } = await API.project.get({ projectId });
        const { thumbnail, wideThumbnail, ...defaultFormData } = data;
        setFormData(defaultFormData);
        setDefaultImage({
          thumbnail,
          wideThumbnail,
        });
      } catch (error) {
        console.log(error.response.message);
      }
    };

    const defaultTags = queryString.parse(search).tag ? queryString.parse(search).tag.split(',') : [];
    const clearForm = () => {
      setFormData({
        title: '',
        uri: '',
        synopsis: '',
        thumbnail: '',
        wideThumbnail: '',
        tags: defaultTags,
        status: 'PUBLIC',
      });
      setDefaultImage({
        thumbnail: '',
        wideThumbnail: '',
      });
    };

    if (projectId) getProjectData();
    return clearForm();
  }, [setFormData, projectId, API, search]);

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
        [error.response.data.field]: error.response.data.message,
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
      >
        <Styled.Description>
          프로젝트를 통해 연재하는 작품 또는 콘텐츠의 대표 제목을 입력하세요.
        </Styled.Description>
      </Styled.InputGroup>
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
          <Styled.Description>
            프로젝트 주소 : https://piction.network/project/
            {formData.uri}
          </Styled.Description>
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
          defaultImage={defaultImage.wideThumbnail}
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
          defaultImage={defaultImage.thumbnail}
          backgroundImage={dummyThumbnailImage}
          onChange={handleChange}
          uploadAPI={API.project.uploadThumbnail}
          columns={2}
        />
      </Styled.ImageGroup>
      <InputGroup
        name="synopsis"
        label="설명"
        placeholder="최대 100자"
        onChange={handleChange}
        value={formData.synopsis}
        errorMessage={errorMessage.synopsis}
      >
        <Styled.Description>
          연재하는 작품 또는 콘텐츠에 대한 간단한 소개 또는 시놉시스를 입력하세요.
        </Styled.Description>
      </InputGroup>
      <Styled.ImageGroup>
        <Label>태그</Label>
        <TagsInput
          value={formData.tags}
          onChange={tags => setFormData(prev => ({ ...prev, tags }))}
          placeholder="#태그입력(최대 5개)"
          maxTags={5}
          invalid={!!errorMessage.tags}
          onlyUnique
        />
        <ErrorMessage>{errorMessage.tags}</ErrorMessage>
      </Styled.ImageGroup>
      <Styled.ImageGroup>
        <Label>프로젝트 숨기기</Label>
        <Styled.CheckboxGroup>
          <Styled.Checkbox
            name="status"
            onChange={(event) => {
              event.persist();
              setFormData(prev => ({ ...prev, status: event.target.checked ? 'HIDDEN' : 'PUBLIC' }));
            }}
            checked={formData.status === 'HIDDEN'}
          />
          픽션에서 프로젝트가 소개되지 않도록 설정합니다.
        </Styled.CheckboxGroup>
      </Styled.ImageGroup>
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
  location: PropTypes.object,
};

export default ProjectForm;
