import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Link } from '@reach/router';

import dummyCoverImage from 'images/img-dummy-960x360.jpg';

import ContentImage from 'components/atoms/ContentImage';

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
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    text-align: center;
  `,
  PostTitle: styled.p`
    margin-top: 4px;
    color: var(--white);
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
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
};

const NextPost = ({ post, ...props }) => (
  <Styled.NextPost to={`../${post.id}`} {...props}>
    <ContentImage
      image={post.cover || dummyCoverImage}
      ratio={960 / 480}
    />
    <Styled.Text>
      다음 포스트
      <Styled.PostTitle>
        {post.title}
      </Styled.PostTitle>
    </Styled.Text>
  </Styled.NextPost>
);

export const NoNextPost = props => (
  <Styled.NoNextPost {...props}>
    <Styled.NoNextPostText>
      다음 포스트가 없습니다.
      <Styled.PostTitle>
        시리즈 전체 목록 보기 &gt;
      </Styled.PostTitle>
    </Styled.NoNextPostText>
  </Styled.NoNextPost>
);

NextPost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default NextPost;
