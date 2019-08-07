import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';

import { ReactComponent as BadMoodIcon } from 'images/ic-mood-bad.svg';

import PostItem from 'components/molecules/PostItem';
import { PrimaryButton } from 'components/atoms/Button';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-flow: column;
    flex: 1;
  `,
  List: styled.div`
    display: flex;
    flex-flow: column;
    > * {
      margin-bottom: var(--row-gap);
    }
  `,
  Empty: styled.div`
    margin: 80px auto;
    color: var(--gray--dark);
    font-size: var(--font-size--base);
    text-align: center;
  `,
  BadMoodIcon: styled(BadMoodIcon)`
    width: 160px;
    height: 160px;
  `,
  More: styled(PrimaryButton)`
    margin-right: auto;
    margin-left: auto;
  `,
};

function PostList({
  projectId, isSubscribing, subscriptionPrice, ...props
}) {
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState(true);
  const [contentList, setContentList] = useState([]);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => (() => {
    setContentList([]);
    setPage(1);
  }), [projectId]);

  useEffect(() => {
    const getFormData = async () => {
      try {
        const { data } = await API.post(projectId).getAll({ params: { size: 10, page } });
        setContentList(prevContentList => [
          ...prevContentList,
          ...data.content,
        ]);
        setIsLast(data.last);
      } catch (error) {
        console.log(error);
      }
    };

    getFormData();
  }, [API, projectId, page]);

  return (
    <Styled.Container {...props}>
      {contentList.length === 0 && (
        <Styled.Empty>
          <Styled.BadMoodIcon />
          <p>
            등록된 포스트가 없습니다.
          </p>
        </Styled.Empty>
      )}
      <Styled.List>
        {contentList.map(content => (
          <Link
            to={
              (isSubscribing || !content.isRequiredFanPass) ? `posts/${content.id}` : 'memberships'
            }
            key={content.id}
          >
            <PostItem
              {...content}
              isLocked={!isSubscribing && content.isRequiredFanPass}
              subscriptionPrice={subscriptionPrice}
            />
          </Link>
        ))}
        {!isLast && (
          <Styled.More onClick={() => setPage(prevPage => (prevPage + 1))}>
            포스트 더 보기
          </Styled.More>
        )}
      </Styled.List>
    </Styled.Container>
  );
}

PostList.propTypes = {
  projectId: PropTypes.string.isRequired,
  isSubscribing: PropTypes.bool,
  subscriptionPrice: PropTypes.number,
};

PostList.defaultProps = {
  isSubscribing: false,
  subscriptionPrice: 0,
};

export default PostList;
