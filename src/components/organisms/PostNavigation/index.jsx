import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';

import media from 'styles/media';
import Grid from 'styles/Grid';

import { ReactComponent as ChevronIcon } from 'images/ic-chevron.svg';

const Styled = {
  Container: styled.nav`
    --columns: 6;
    grid-column: 1 / -1;
    ${media.desktop`
      --columns: 8;
      grid-column: 3 / -3;
    `}
  `,
  PrevNext: styled(Grid).attrs({
    columns: 'var(--columns)',
  })`
    margin-bottom: 24px;
    border: solid var(--gray--light);
    border-width: 1px 0;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Prev: styled(Link)`
    display: flex;
    align-items: center;
    grid-column: 1 / span 3;
    padding: 16px 0;
  `,
  Next: styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-column: span 3 / -1;
    padding: 16px 0;
    svg {
      transform: rotate(180deg);
    }
  `,
  PostList: styled.div`
    display: flex;
    flex-flow: column;
    margin-bottom: 48px;
  `,
  SeriesName: styled.h2`
    margin-bottom: 4px;
  `,
  PostCount: styled.p`
    margin-bottom: 16px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Post: styled(Grid).attrs({
    as: Link,
    columns: 'var(--columns)',
  })`
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid var(--gray--light);
    color: var(--gray--dark);
    &[aria-current] {
      color: var(--black);
    }
    &:first-of-type {
      border-top: 1px solid var(--gray--light);
    }
  `,
  PostIndex: styled.span`
    grid-column: span 1;
    font-size: 22px;
    font-weight: bold;
  `,
  PostTitle: styled.span`
    grid-column: span 5;
    overflow: hidden;
    font-size: var(--font-size--small);
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  AllPosts: styled(Link)`
    margin-top: 16px;
    color: var(--blue);
    font-size: var(--font-size--small);
  `,
};

function PostNavigation({ projectId, postId, series }) {
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [postList, setPostList] = useState([]);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getPrevNext = async () => {
      try {
        const { data: previousData } = await API.post(projectId).getPreviousPost({ postId });
        setPrev(previousData);
      } catch (error) {
        setPrev(null);
      }

      try {
        const { data: nextData } = await API.post(projectId).getNextPost({ postId });
        setNext(nextData);
      } catch (error) {
        setNext(null);
      }
    };

    const getPostList = async () => {
      try {
        const { data } = await API.series(projectId).getPreviousAndNextPosts({
          postId,
          seriesId: series.id,
        });
        setPostList(data);
      } catch (error) {
        console.log(error);
      }
    };

    getPrevNext();
    if (series) {
      getPostList();
    }

    return () => {
      setPrev(null);
      setNext(null);
      setPostList([]);
    };
  }, [API, postId, projectId, series]);

  return (
    <Styled.Container>
      <Styled.PrevNext>
        {prev && (
          <Styled.Prev to={`../${prev.id}`}>
            <ChevronIcon />
            이전 포스트
          </Styled.Prev>
        )}
        {next && (
          <Styled.Next to={`../${next.id}`}>
            다음 포스트
            <ChevronIcon />
          </Styled.Next>
        )}
      </Styled.PrevNext>
      {series && (
        <Styled.PostList>
          <Styled.SeriesName>{series.name}</Styled.SeriesName>
          <Styled.PostCount>{`${series.postCount} 포스트`}</Styled.PostCount>
          {postList.map(({ index, post }) => (
            <Styled.Post to={`../${post.id}`}>
              <Styled.PostIndex>
                #
                {index + 1}
              </Styled.PostIndex>
              <Styled.PostTitle>
                {post.title}
              </Styled.PostTitle>
            </Styled.Post>
          ))}
          <Styled.AllPosts to={`../../series/${series.id}`}>
            포스트 전체 목록
          </Styled.AllPosts>
        </Styled.PostList>
      )}
    </Styled.Container>
  );
}

PostNavigation.propTypes = {
  projectId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  series: PropTypes.object,
};

export default PostNavigation;
