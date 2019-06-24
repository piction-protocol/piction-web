import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import useCurrentUser from 'hooks/useCurrentUser';
import useForm from 'hooks/useForm';

import { ProjectContext } from 'context/ProjectContext';

import InputGroup from 'components/molecules/InputGroup';
import ImageUploader from 'components/atoms/ImageUploader';
import { PrimaryButton } from 'components/atoms/Button';

import dummyWideThumbnailImage from 'images/img-dummy-1440x450.jpg';
import dummyThumbnailImage from 'images/img-dummy-500x500.jpg';

const Styled = {
  Form: styled.form`
    display: flex;
    flex-flow: column;
    padding: 24px 0 48px;
    font-size: var(--font-size--small);
  `,
  Preview: styled.p`
    margin-bottom: 24px;
    color: var(--blue);
  `,
  InputGroup: styled(InputGroup)`
    margin-bottom: 24px;
  `,
  Label: styled.label`
    margin-bottom: 8px;
    font-weight: bold;
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
};

function ProjectForm({ projectId }) {
  const data = useContext(ProjectContext);
  const [formData, setFormData, { handleChange }] = useForm({
    title: '',
    uri: '',
    synopsis: '',
    thumbnail: '',
    wideThumbnail: '',
    subscriptionPrice: '',
  });

  useEffect(() => {
    if (projectId) {
      setFormData({
        title: data.title,
        uri: data.uri,
        synopsis: data.synopsis,
        subscriptionPrice: data.subscriptionPrice,
      });
    }
  }, [projectId, setFormData, data]);

  const { accessToken } = useCurrentUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: projectId ? 'put' : 'post',
        url: `http://api-iro.piction.network/projects/${projectId}`,
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
      <Styled.InputGroup
        name="title"
        label="프로젝트 제목"
        placeholder="프로젝트 제목을 입력해주세요."
        onChange={handleChange}
        value={formData.title}
      />
      <Styled.InputGroup
        name="uri"
        label="프로젝트 ID"
        onChange={handleChange}
        disabled={projectId}
        value={formData.uri}
      />
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
      <Styled.Label>
        프로젝트 대표 이미지
      </Styled.Label>
      <Styled.Spec>
        JPG 또는 PNG 파일, 최대 5MB, 권장 사이즈 1440*450 px
      </Styled.Spec>
      <Styled.ImageUploader
        name="wideThumbnail"
        ratio={1440 / 450}
        backgroundImage={dummyWideThumbnailImage}
        onChange={handleChange}
        url="http://api-iro.piction.network/projects/wide-thumbnail"
        style={{ width: 295 }}
      />
      <Styled.Spec>
        JPG 또는 PNG 파일, 최대 5MB, 권장 사이즈 500*500 px
      </Styled.Spec>
      <Styled.ImageUploader
        name="thumbnail"
        ratio={500 / 500}
        backgroundImage={dummyThumbnailImage}
        onChange={handleChange}
        url="http://api-iro.piction.network/projects/thumbnail"
      />
      <Styled.InputGroup
        name="synopsis"
        label="시놉시스"
        placeholder="프로젝트와 작품에 대한 설명 텍스트를 한 줄로 출력합니다."
        onChange={handleChange}
        value={formData.synopsis}
      />
      <Styled.InputGroup
        name="subscriptionPrice"
        label="유료 멤버십 가격"
        placeholder="0"
        onChange={handleChange}
        value={formData.subscriptionPrice}
      />
      <PrimaryButton
        as="input"
        type="submit"
        value="저장"
      />
    </Styled.Form>
  );
}

ProjectForm.propTypes = {
  projectId: PropTypes.string,
};

ProjectForm.defaultProps = {
  projectId: '',
};

export default ProjectForm;
