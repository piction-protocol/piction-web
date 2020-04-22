import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link, useParams } from 'react-router-dom';
import queryString from 'query-string';
import useSWR from 'swr';

import { ReactComponent as BadMoodIcon } from 'images/ic-mood-bad.svg';

import DeletePostModal from 'components/molecules/DeletePostModal';
import DashboardPostItem from 'components/molecules/DashboardPostItem';
import Pagination from 'components/molecules/Pagination';
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

function DashboardPostList({ title }) {
  const { projectId } = useParams();
  const [deletingPost, setDeletingPost] = useState(null);
  const [seriesId, setSeriesId] = useState('');
  const [page, setPage] = useState(1);
  const [condition, setCondition] = useState(null);
  const [membershipLevel, setMembershipLevel] = useState(null);

  const query = queryString.stringify({
    page, seriesId, condition, membershipLevel,
  });

  const handleQuery = (value) => {
    if (value === 'PUBLIC') {
      setCondition('PUBLIC');
      setMembershipLevel(null);
    } else if (value === '') {
      setCondition(null);
      setMembershipLevel(null);
    } else {
      setCondition('MEMBERSHIP');
      setMembershipLevel(value);
    }
  };

  // FIXME: suspense 옵션 제거하고 placeholder 추가
  const { data: postList } = useSWR(`my/projects/${projectId}/posts?${query}`, { suspense: true });
  const { data: membershipList } = useSWR(`/projects/${projectId}/memberships`, { suspense: true });
  const { data: seriesList } = useSWR(`/projects/${projectId}/series`, { suspense: true });

  return (
    <Styled.Container>
      <Heading>{title}</Heading>
      <Styled.Tools>
        <Styled.Select
          onChange={event => handleQuery(event.target.value)}
          options={[
            { text: '권한 필터', value: '' },
            { text: '전체 공개', value: 'PUBLIC' },
            ...membershipList.map(membership => ({
              text: membership.level > 0 ? `티어 ${membership.level}` : '구독자 공개',
              value: membership.level,
            })),
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
        <Styled.New to={`/dashboard/${projectId}/posts/new`}>+ 새 포스트 등록</Styled.New>
      </Styled.Tools>
      {postList.content.length === 0 && (
        <Styled.Empty>
          <Styled.BadMoodIcon />
          <p>
            등록된 포스트가 없습니다.
          </p>
        </Styled.Empty>
      )}
      <Styled.List>
        {postList.content.map(post => (
          <DashboardPostItem
            {...post}
            projectId={projectId}
            handleDelete={() => setDeletingPost(post.id)}
            key={post.id}
          />
        ))}
      </Styled.List>
      <Pagination
        number={postList.number}
        totalPages={postList.totalPages}
        setPage={setPage}
        delta={2}
      />
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
