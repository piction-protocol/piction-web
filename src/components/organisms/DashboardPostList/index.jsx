import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';
import useOnScrollToBottom from 'hooks/useOnScrollToBottom';

import { ReactComponent as BadMoodIcon } from 'images/ic-mood-bad.svg';

import DeletePostModal from 'components/molecules/DeletePostModal';
import DashboardPostItem from 'components/molecules/DashboardPostItem';
import Heading from 'components/atoms/Heading';
import Select from 'components/atoms/Select';
import { PrimaryButton } from 'components/atoms/Button';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-flow: column;
    flex: 1;
    padding: 24px 0 48px;
    font-size: var(--font-size--small);
    > * {
      margin-bottom: var(--row-gap);
    }
  `,
  Tools: styled.div`
    display: flex;
  `,
  Select: styled(Select)`
    width: 190px;
    margin-right: 16px;
  `,
  New: styled(PrimaryButton).attrs({
    as: Link,
    size: 'mini',
  })`
    margin-left: auto;
  `,
  List: styled.div`
    display: flex;
    flex-flow: column;
    > * {
      margin-bottom: 8px;
    }
  `,
  Empty: styled.div`
    margin: auto;
    color: var(--gray--dark);
    font-size: var(--font-size--base);
    text-align: center;
  `,
  BadMoodIcon: styled(BadMoodIcon)`
    width: 160px;
    height: 160px;
  `,
};

function DashboardPostList({ title, projectId }) {
  const [postList, setPostList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [deletingPost, setDeletingPost] = useState(null);
  const [isRequiredFanPass, setIsRequiredFanPass] = useState('');
  const [seriesId, setSeriesId] = useState('');
  const [page, setPage] = useState(1);
  const [pageable, setPageable] = useState({});
  const listRef = useRef(null);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getFormData = async () => {
      try {
        const { data: { content: postsData, ...pageableData } } = await API.my.posts({
          projectId,
          params: {
            size: 15,
            page,
            isRequiredFanPass,
            seriesId,
          },
        });
        await setPageable(pageableData);

        if (pageableData.first) {
          setPostList(postsData);
        } else {
          setPostList(prev => [...prev, ...postsData]);
        }

        const { data: seriesData } = await API.series(projectId).getAll();
        setSeriesList(seriesData);
      } catch (error) {
        console.log(error);
      }
    };

    getFormData();
  }, [API, projectId, page, isRequiredFanPass, seriesId]);

  useOnScrollToBottom(listRef, () => {
    if (!pageable.last) {
      setPage(prev => prev + 1);
    }
  });

  return (
    <Styled.Container>
      <Heading>{title}</Heading>
      <Styled.Tools>
        <Styled.Select
          onChange={event => setIsRequiredFanPass(event.target.value)}
          value={isRequiredFanPass}
          options={[
            { text: '공개 설정 필터', value: '' },
            { text: '전체 공개', value: 'false' },
            { text: '구독자 공개', value: 'true' },
          ]}
        />
        <Styled.Select
          onChange={event => setSeriesId(event.target.value)}
          value={seriesId}
          options={[
            { text: '시리즈 필터', value: '' },
            { text: '미지정', value: '0' },
            ...seriesList.map(series => ({ text: series.name, value: series.id })),
          ]}
        />
        <Styled.New to="new">+ 새 포스트 등록</Styled.New>
      </Styled.Tools>
      {postList.length === 0 && (
        <Styled.Empty>
          <Styled.BadMoodIcon />
          <p>
            등록된 포스트가 없습니다.
          </p>
        </Styled.Empty>
      )}
      <Styled.List ref={listRef}>
        {postList.map(post => (
          <DashboardPostItem
            {...post}
            projectId={projectId}
            handleDelete={() => setDeletingPost(post.id)}
            key={post.id}
          />
        ))}
      </Styled.List>

      {deletingPost && (
        <DeletePostModal
          projectId={projectId}
          postId={deletingPost}
          close={() => setDeletingPost(null)}
        />
      )}
    </Styled.Container>
  );
}

DashboardPostList.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default DashboardPostList;
