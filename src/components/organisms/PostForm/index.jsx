import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, navigate } from '@reach/router';
import moment from 'moment';

import useAPI from 'hooks/useAPI';
import useForm from 'hooks/useForm';

import Grid from 'styles/Grid';

import Editor from 'components/molecules/Editor';
import InputGroup from 'components/molecules/InputGroup';
import CreateSeriesModal from 'components/molecules/CreateSeriesModal';
import Heading from 'components/atoms/Heading';
import Label from 'components/atoms/Label';
import Input from 'components/atoms/Input';
import ErrorMessage from 'components/atoms/ErrorMessage';
import Radio from 'components/atoms/Radio';
import ImageUploader from 'components/atoms/ImageUploader';
import Checkbox from 'components/atoms/Checkbox';
import Select from 'components/atoms/Select';
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
  Select: styled(Select)`
    grid-column: span 2;
  `,
  AddSeriesButton: styled(PrimaryButton).attrs({
    size: 'mini',
    type: 'button',
  })`
    grid-column: span 2;
    margin-right: auto;
  `,
  Preview: styled.p`
    color: var(--blue);
  `,
  Group: styled(Grid).attrs({
    columns: 9,
  })`
    --row-gap: 8px;
    grid-column: 1 / -1;
    > * {
      grid-column: 1 / -1;
    }
  `,
  Input: styled(Input)`
    grid-column: span ${({ columns }) => columns};
    padding-right: 0;
  `,
  ImageUploader: styled(ImageUploader)`
    ${({ columns }) => columns && `grid-column: span ${columns};`}
  `,
  Spec: styled.p`
    font-size: var(--font-size--small);
    color: var(--gray--dark);
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
  Submit: styled(PrimaryButton)`
    margin-right: 16px;
  `,
};

function PostForm({ title, projectId, postId = null }) {
  const [formData, { setFormData, handleChange }] = useForm({
    title: '',
    content: '',
    cover: '',
    publishNow: true,
    publishingDate: moment().format('YYYY-MM-DD'),
    publishingTime: moment().format('HH:mm:ss'),
    status: 'PUBLIC',
  });
  const [isPublished, setIsPublished] = useState(false);
  const [defaultImage, setDefaultImage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [series, setSeries] = useState([]);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getFormData = async () => {
      try {
        const { data } = await API.post(projectId).get({ postId });
        const { data: contentData } = await API.post(projectId).getContent({ postId });
        const fanPass = await API.fanPass.getAll({ projectId });
        const fanPassId = fanPass.data[0].id;
        const { cover, ...defaultFormData } = {
          ...data,
          seriesId: data.series ? data.series.id : '',
          publishNow: false,
          publishingDate: moment(data.publishedAt).format('YYYY-MM-DD'),
          publishingTime: moment(data.publishedAt).format('HH:mm:ss'),
        };
        setIsPublished(data.publishedAt < Date.now());
        setFormData({ ...defaultFormData, content: contentData.content, fanPassId });
        setDefaultImage({
          cover,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getSeries = async () => {
      try {
        const { data: seriesData } = await API.series(projectId).getAll();
        setSeries(seriesData);
      } catch (error) {
        console.log(error);
      }
    };

    const clearForm = () => {
      setFormData({
        title: '',
        content: '',
        cover: '',
        seriesId: '',
        publishNow: true,
        publishingDate: moment().format('YYYY-MM-DD'),
        publishingTime: moment().format('HH:mm:ss'),
        status: 'PUBLIC',
      });
      setDefaultImage({
        cover: '',
      });
    };

    getSeries();
    if (postId) getFormData();
    return clearForm();
  }, [API, projectId, postId, setFormData]);

  const handleEditor = (value) => {
    setFormData(prevFormData => ({ ...prevFormData, content: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fanPass = await API.fanPass.getAll({ projectId });
    const fanPassId = fanPass.data[0].id;
    try {
      if (postId) {
        await API.post(projectId).update({
          ...formData,
          ...isPublished ? {} : {
            publishedAt: formData.publishNow
              ? Date.now()
              : moment(formData.publishingDate) + moment.duration(formData.publishingTime),
          },
          postId,
          fanPassId: formData.status === 'FAN_PASS' ? fanPassId : null,
        });
      } else {
        await API.post(projectId).create({
          ...formData,
          publishedAt: formData.publishNow
            ? Date.now()
            : moment(formData.publishingDate) + moment.duration(formData.publishingTime),
          fanPassId: formData.status === 'FAN_PASS' ? fanPassId : null,
        });
      }
      navigate(`/dashboard/${projectId}/posts`);
    } catch (error) {
      setErrorMessage({
        [error.response.data.field]: error.response.data.message,
      });
    }
  };

  return (
    <>
      <Styled.Form onSubmit={handleSubmit}>
        <Heading>{title}</Heading>
        <Styled.Select
          name="seriesId"
          value={formData.seriesId}
          onChange={handleChange}
          options={[
            { text: '시리즈 선택', value: 'null' },
            ...series.map(item => ({
              text: item.name,
              value: item.id,
            })),
          ]}
        />
        <Styled.AddSeriesButton onClick={() => setIsCreating(true)}>
          + 새 시리즈
        </Styled.AddSeriesButton>
        {errorMessage.content}
        <InputGroup
          name="title"
          placeholder="포스트 제목을 입력해주세요."
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
          {errorMessage.content && (
            <ErrorMessage>
              {errorMessage.content}
            </ErrorMessage>
          )}
        </Styled.Group>
        <Styled.Group>
          <Label>
            공개 설정
          </Label>
          <Radio
            name="status"
            onChange={handleChange}
            value="PUBLIC"
            checked={formData.status === 'PUBLIC'}
          >
            전체 공개
          </Radio>
          <Radio
            name="status"
            onChange={handleChange}
            value="FAN_PASS"
            checked={formData.status === 'FAN_PASS'}
          >
            구독자 공개
          </Radio>
          <Radio
            name="status"
            onChange={handleChange}
            value="PRIVATE"
            checked={formData.status === 'PRIVATE'}
          >
            비공개
          </Radio>
        </Styled.Group>
        <Styled.Group>
          <Label>
            발행 시간 설정
          </Label>
          {!isPublished && (
            <Styled.CheckboxGroup>
              <Styled.Checkbox
                name="publishNow"
                onChange={handleChange}
                checked={formData.publishNow}
              />
              즉시 발행
            </Styled.CheckboxGroup>
          )}
          <Styled.Input
            name="publishingDate"
            columns={3}
            type="date"
            disabled={formData.publishNow || isPublished}
            onChange={handleChange}
            value={formData.publishingDate}
          />
          <Styled.Input
            name="publishingTime"
            columns={2}
            step="1"
            type="time"
            disabled={formData.publishNow || isPublished}
            onChange={handleChange}
            value={formData.publishingTime}
          />
          <Styled.Spec>
            공개 설정과 관계없이 설정한 시간 이전에는 포스트가 공개되지 않습니다.
          </Styled.Spec>
          <Styled.Spec>
            한 번 포스트가 발행된 이후에는 발행 시간을 변경할 수 없습니다.
          </Styled.Spec>
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
      {isCreating && (
        <CreateSeriesModal
          projectId={projectId}
          close={() => setIsCreating(false)}
          callback={setSeries}
        />
      )}
    </>
  );
}

PostForm.propTypes = {
  projectId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  postId: PropTypes.string,
};

export default PostForm;
