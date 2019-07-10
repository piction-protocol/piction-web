import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, navigate } from '@reach/router';

import useAPI from 'hooks/useAPI';
import useForm from 'hooks/useForm';

import Grid from 'styles/Grid';

import Editor from 'components/molecules/Editor';
import InputGroup from 'components/molecules/InputGroup';
import Heading from 'components/atoms/Heading';
import Label from 'components/atoms/Label';
import ErrorMessage from 'components/atoms/ErrorMessage';
import Radio from 'components/atoms/Radio';
import ImageUploader from 'components/atoms/ImageUploader';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

import dummyCoverImage from 'images/img-dummy-960x360.jpg';

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
  Preview: styled.p`
    color: var(--blue);
  `,
  Group: styled(Grid).attrs({
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
  Spec: styled.p`
    margin-bottom: 8px;
    font-size: var(--font-size--small);
    color: var(--gray--dark);
  `,
  SubmitGroup: styled.div`
    grid-column: 1 / -1;
    padding-top: var(--row-gap);
    border-top: 1px solid var(--gray--light);
  `,
  Submit: styled(PrimaryButton)`
    margin-right: 16px;
  `,
};

function PostForm({ title, projectId, postId }) {
  const [formData, { setFormData, handleChange }] = useForm({
    title: '',
    content: '',
    cover: '',
    requiredSubscription: false,
  });
  const [defaultImage, setDefaultImage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getFormData = async () => {
      try {
        const { data } = await API.post(projectId).get({ postId });
        const content = await API.post(projectId).getContent({ postId });
        const { cover, ...defaultFormData } = data;
        setFormData({ ...defaultFormData, content: content.data.content });
        setDefaultImage({
          cover,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (postId) getFormData();
  }, [API, projectId, postId, setFormData]);

  const handleEditor = (value) => {
    setFormData(prevFormData => ({ ...prevFormData, content: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (postId) {
        await API.post(projectId).update({ ...formData, postId });
      } else {
        await API.post(projectId).create(formData);
      }
      navigate(`/dashboard/${projectId}/posts`);
    } catch (error) {
      setErrorMessage({
        [error.response.data.field]: error.response.data.message,
      });
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Heading>{title}</Heading>
      <InputGroup
        name="title"
        placeholder="프로젝트 제목을 입력해주세요."
        onChange={handleChange}
        value={formData.title}
        required
        errorMessage={errorMessage.title}
      />
      <Editor
        projectId={projectId}
        onChange={handleEditor}
        value={formData.content}
      />
      {errorMessage.content && (
        <ErrorMessage>
          {errorMessage.content}
        </ErrorMessage>
      )}
      <Styled.Group>
        <Label>
          커버이미지
        </Label>
        <Styled.Spec>
          JPG 또는 PNG 파일, 최대 5MB, 권장 사이즈 960*360 px
        </Styled.Spec>
        <Styled.ImageUploader
          name="cover"
          ratio={960 / 360}
          defaultImage={defaultImage.cover}
          backgroundImage={dummyCoverImage}
          onChange={handleChange}
          uploadAPI={API.post(projectId).uploadCoverImage}
          columns={3}
        />
      </Styled.Group>
      <Styled.Group>
        <Label>
          공개 설정
        </Label>
        <Radio
          name="requiredSubscription"
          onChange={handleChange}
          value="false"
          checked={formData.requiredSubscription === 'false' || formData.requiredSubscription === false}
        >
          전체 공개
        </Radio>
        <Radio
          name="requiredSubscription"
          onChange={handleChange}
          value="true"
          checked={formData.requiredSubscription === 'true' || formData.requiredSubscription === true}
        >
          멤버십 구독자 공개
        </Radio>
      </Styled.Group>
      <Styled.SubmitGroup>
        <Styled.Submit
          as="input"
          type="submit"
          value="포스트 등록"
        />
        <SecondaryButton
          as={Link}
          to={`/dashboard/${projectId}/posts/`}
        >
          작성 취소
        </SecondaryButton>
      </Styled.SubmitGroup>
    </Styled.Form>
  );
}

PostForm.propTypes = {
  projectId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  postId: PropTypes.string,
};

PostForm.defaultProps = {
  postId: null,
};

export default PostForm;
