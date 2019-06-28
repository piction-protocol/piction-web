import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';
import useForm from 'hooks/useForm';

import Grid from 'styles/Grid';

import Editor from 'components/molecules/Editor';
import InputGroup from 'components/molecules/InputGroup';
import Heading from 'components/atoms/Heading';
import Radio from 'components/atoms/Radio';
import ImageUploader from 'components/atoms/ImageUploader';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

import dummyWideThumbnailImage from 'images/img-dummy-1440x450.jpg';

const Styled = {
  Form: styled.form`
    font-size: var(--font-size--small);
  `,
  Preview: styled.p`
    margin-bottom: 24px;
    color: var(--blue);
  `,
  Label: styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: var(--font-size--small);
  `,
  Spec: styled.p`
    margin-bottom: 8px;
    font-size: var(--font-size--small);
    color: var(--gray--dark);
  `,
  Group: styled.div`
    white-space: nowrap;
  `,
  Radio: styled(Radio)`
    margin-bottom: 16px;
  `,
  ErrorMessage: styled.p`
    margin: 8px 0 0;
    color: var(--red);
    font-size: var(--font-size--small);
  `,
  Submit: styled(PrimaryButton)`
    margin-right: 16px;
  `,
};

function PostForm({ title, projectId, postId }) {
  const [formData, setFormData, { handleChange }] = useForm({
    title: '',
    content: '',
    cover: '',
    requiredSubscription: false,
  });
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getFormData = async () => {
      try {
        const response = await API.post(projectId).getPost({ postId });
        setFormData(response);
        console.log(response);
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
      const response = await API.post(projectId).create(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Grid columns={9}>
        <Heading>{title}</Heading>
        <InputGroup
          name="title"
          placeholder="프로젝트 제목을 입력해주세요."
          onChange={handleChange}
          value={formData.title}
          required
        />
        <Editor
          projectId={projectId}
          onChange={handleEditor}
          value={formData.content}
        />
        <Styled.Group columns={3}>
          <Styled.Label>
            커버이미지
          </Styled.Label>
          <Styled.Spec>
            JPG 또는 PNG 파일, 최대 5MB, 권장 사이즈 960*360 px
          </Styled.Spec>
          <ImageUploader
            name="cover"
            ratio={960 / 360}
            backgroundImage={dummyWideThumbnailImage}
            onChange={handleChange}
            uploadAPI={API.post(projectId).uploadCoverImage}
          />
        </Styled.Group>
        <div>
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
        </div>
      </Grid>
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
