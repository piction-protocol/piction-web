/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';

import Cover from 'components/atoms/ContentImage/Cover';

const Styled = {
  NextPost: styled(Link)`
    position: relative;
  `,
  Text: styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 16px;
    background-color: rgba(0, 0, 0, .60);
    color: var(--gray);
    font-size: var(--font-size--small);
    text-align: center;
  `,
  PostTitle: styled.p`
    margin-top: 4px;
    overflow: hidden;
    color: var(--white);
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  NoNextPost: styled(Link)`
    position: relative;
    padding-top: 50%;
  `,
  NoNextPostText: styled.div`
    display: flex;
    position: absolute;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #333333;
    color: var(--gray);
    font-size: var(--font-size--small);
  `,
};

const NextPost = ({ post, ...props }) => {
  const { t } = useTranslation();
  return (
    <Styled.NextPost to={`../${post.id}`} {...props}>
      <Cover
        image={post.cover}
        width={960}
        height={480}
      />
      <Styled.Text>
        {t('다음 포스트')}
      <Styled.PostTitle>
        {post.title}
      </Styled.PostTitle>
      </Styled.Text>
    </Styled.NextPost>
  );
};

export const NoNextPost = (props) => {
  const { t } = useTranslation();
  return (
    <Styled.NoNextPost {...props}>
      <Styled.NoNextPostText>
          {t('다음 포스트가 없습니다.')}
        <Styled.PostTitle>
          {t('전체 목록 보기')}
          {' '}
          &gt;
        </Styled.PostTitle>
      </Styled.NoNextPostText>
    </Styled.NoNextPost>
  );
};

NextPost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default NextPost;
