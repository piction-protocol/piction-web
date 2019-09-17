import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';

import media from 'styles/media';
import Grid from 'styles/Grid';

import { ReactComponent as ChevronIcon } from 'images/ic-chevron.svg';

import NextPost, { NoNextPost } from './NextPost';

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
    ${media.desktop`
      margin-bottom: 64px;
    `}
  `,
  Prev: styled(Link)`
    display: flex;
    align-items: center;
    grid-column: 1 / span 3;
    padding: 16px 0;
    ${media.desktop`
      padding: 24px 24px 24px 0;
      svg {
        flex: 0 0 auto;
        width: 48px;
        height: 48px;
      }
    `}
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
    ${media.desktop`
      padding: 24px 0 24px 24px;
      svg {
        flex: 0 0 auto;
        width: 48px;
        height: 48px;
      }
    `}
  `,
  Text: styled.div`
    overflow: hidden;
  `,
  PrevNextTitle: styled.p`
    margin-top: 4px;
    overflow: hidden;
    color: var(--black);
    text-overflow: ellipsis;
    white-space: nowrap;
    ${media.mobile`
      display: none;
    `}
  `,
  Series: styled.div`
    display: flex;
    flex-flow: column;
    margin-bottom: 48px;
    ${media.desktop`
      flex-flow: row wrap;
      align-items: center;
    `}
  `,
  SeriesName: styled.h2`
    ${media.mobile`
      margin-bottom: 4px;
    `}
    ${media.desktop`
      margin-right: 12px;
    `}
  `,
  PostCount: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  AllPosts: styled(Link)`
    color: var(--blue);
    font-size: var(--font-size--small);
    ${media.mobile`
      order: 1;
      margin-top: 16px;
    `}
    ${media.desktop`
      margin-left: auto;
    `}
  `,
  PostList: styled(Grid).attrs({
    columns: 'var(--columns)',
  })`
    ${media.mobile`
      display: flex;
      flex-flow: column;
      margin-top: 16px;
      border-top: 1px solid var(--gray--light);
    `}
    ${media.desktop`
      --row-gap: 8px;
      width: 100%;
      margin-top: 24px;
    `}
  `,
  NextPost: styled(NextPost)`
    grid-column: 1 / span 4;
    grid-row: span 5;
    ${media.mobile`
      display: none;
    `}
  `,
  NoNextPost: styled(NoNextPost)`
    grid-column: 1 / span 4;
    grid-row: span 5;
    ${media.mobile`
      display: none;
    `}
  `,
  Post: styled(Grid).attrs({
    as: Link,
    columns: 'var(--columns)',
  })`
    align-items: center;
    color: var(--gray--dark);
    &[aria-current] {
      color: var(--black);
    }
    ${media.mobile`
      padding: 16px 0;
      border-bottom: 1px solid var(--gray--light);
    `}
    ${media.desktop`
      display: flex;
      grid-column: span 4 / -1;
    `}
  `,
  PostIndex: styled.span`
    grid-column: span 1;
    font-size: 22px;
    font-weight: bold;
    ${media.desktop`
      margin-right: 20px;
    `}
  `,
  PostTitle: styled.span`
    grid-column: span 5;
    overflow: hidden;
    font-size: var(--font-size--small);
    white-space: nowrap;
    text-overflow: ellipsis;
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

    return (() => {
      setPrev(null);
      setNext(null);
      setPostList([]);
    });
  }, [API, postId, projectId, series]);

  return (
    <Styled.Container>
      <Styled.PrevNext>
        {prev && (
          <Styled.Prev to={`../${prev.id}`}>
            <ChevronIcon />
            <Styled.Text>
              이전 포스트
              <Styled.PrevNextTitle>
                {prev.title}
              </Styled.PrevNextTitle>
            </Styled.Text>
          </Styled.Prev>
        )}
        {next && (
          <Styled.Next to={`../${next.id}`}>
            <Styled.Text>
              다음 포스트
              <Styled.PrevNextTitle>
                {next.title}
              </Styled.PrevNextTitle>
            </Styled.Text>
            <ChevronIcon />
          </Styled.Next>
        )}
      </Styled.PrevNext>
      {series && (
        <Styled.Series>
          <Styled.SeriesName>{series.name}</Styled.SeriesName>
          <Styled.PostCount>{`${series.postCount} 포스트`}</Styled.PostCount>
          <Styled.AllPosts to={`../../series/${series.id}`}>
            포스트 전체 목록
          </Styled.AllPosts>
          <Styled.PostList>
            {postList[postList.findIndex(({ post }) => String(post.id) === postId) + 1] ? (
              <Styled.NextPost post={
                postList[postList.findIndex(({ post }) => String(post.id) === postId) + 1].post
              }
              />
            ) : (
              <Styled.NoNextPost to={`../../series/${series.id}`} />
            )}
            {postList.map(({ index, post }) => (
              <Styled.Post to={`../${post.id}`} key={post.id}>
                <Styled.PostIndex>
                  #
                  {index + 1}
                </Styled.PostIndex>
                <Styled.PostTitle>
                  {post.title}
                </Styled.PostTitle>
              </Styled.Post>
            ))}
          </Styled.PostList>
        </Styled.Series>
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