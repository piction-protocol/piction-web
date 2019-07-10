import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

import useAPI from 'hooks/useAPI';
import useCurrentUser from 'hooks/useCurrentUser';

import ContentStyle from 'styles/ContentStyle';
import media from 'styles/media';

import GridTemplate from 'components/templates/GridTemplate';
import Spinner from 'components/atoms/Spinner';
import Heading from 'components/atoms/Heading';
import LikeButton from 'components/atoms/LikeButton';

const Styled = {
  Container: styled.article`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -1;
    margin: 24px 0;
    ${media.desktop`
      grid-column: 3 / 11;
    `}
  `,
  ProjectName: styled(Link)`
    margin-bottom: 8px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Info: styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: var(--row-gap);
    padding-bottom: var(--row-gap);
    border-bottom: 1px solid var(--gray--light);
    text-align: center;
  `,
  Content: styled.div`
    ${ContentStyle}
  `,
  Date: styled.p`
    margin-top: var(--row-gap);
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  LikeButton: styled(LikeButton)`
    margin: 48px auto;
  `,
};

function PostPage({ projectId, postId }) {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentUser } = useCurrentUser();
  const [API, handleError] = useCallback(useAPI(), []);

  useEffect(() => {
    const getpost = async () => {
      const [project, post, content, isLike] = await Promise.all([
        API.project.get({ projectId }),
        API.post(projectId).get({ postId }),
        API.post(projectId).getContent({ postId }),
        (currentUser && API.post(projectId).getIsLike({ postId })),
      ]);
      setData({
        project: project.data,
        post: post.data,
        content: content.data.content,
        isLike: currentUser ? isLike.data.like : false,
      });
      setIsLoaded(true);
    };

    getpost();
  }, [currentUser, API, postId, projectId]);

  const handleLike = async () => {
    try {
      const response = await API.post(projectId).like({ postId });
      setData(prevData => ({
        ...prevData,
        post: response.data,
        isLike: true,
      }));
    } catch (error) {
      handleError(error.response.data);
    }
  };

  return isLoaded ? (
    <GridTemplate>
      <Styled.Container>
        <Styled.Info>
          <Styled.ProjectName
            to="../"
          >
            {data.project.title}
          </Styled.ProjectName>
          <Heading>
            {data.post.title}
          </Heading>
        </Styled.Info>
        <Styled.Content
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        />
        <Styled.Date>
          {`${moment(data.post.createdAt).format('ll k:m')} 등록`}
        </Styled.Date>
        <Styled.LikeButton
          likeCount={data.post.likeCount}
          isLike={data.isLike}
          onClick={handleLike}
        />
      </Styled.Container>
    </GridTemplate>
  ) : (<Spinner />);
}

export default PostPage;

PostPage.propTypes = {
  projectId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};
