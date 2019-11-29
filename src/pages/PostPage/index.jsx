import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import 'moment/locale/ko';
import useSWR, { mutate } from 'swr';

import media, { mediaQuery } from 'styles/media';
import useMedia from 'hooks/useMedia';

import useProjectLayout from 'hooks/useNavigationLayout';
import useCurrentUser from 'hooks/useCurrentUser';
import useAPI from 'hooks/useAPI';
import useLocalStorage from 'hooks/useLocalStorage';

import GridTemplate from 'components/templates/GridTemplate';
import PostNavigation from 'components/organisms/PostNavigation';

import Button from 'components/atoms/Button';
import LikeButton from 'components/atoms/LikeButton';
import { navigate } from '@reach/router';
import Header from './Header';
import Content from './Content';

const AdultPopup = React.lazy(() => import('components/organisms/AdultPopup'));

const Styled = {
  Article: styled.article`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -1;
    margin: 24px 0;
    ${media.desktop`
      grid-column: 3 / 11;
    `}
  `,
  ArticleWrapper: styled.div`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -1;
  `,
  LikeButton: styled(LikeButton)`
    margin: 48px auto 24px;
  `,
  ReaderModeToggle: styled(Button)`
    font-size: 12px;
    font-weight: normal;
    color: var(--gray--dark);
    background-color: var(--white);
    box-shadow: 0 1px 2px 0 var(--shadow-color);
    &:hover {
      box-shadow: 0 2px 4px 0 var(--shadow-color);
    }
  `,
};

function PostPage({ projectId, postId }) {
  const isDesktop = useMedia(mediaQuery.desktop);
  const [textmode, setTextmode] = useLocalStorage(`project/${projectId}/textmode`, false);
  const [cookies, setCookie] = useCookies([`no-warning-${projectId}`]);
  const [API, handleError] = useCallback(useAPI(), []);

  const { data: project, error: projectError } = useSWR(`/projects/${projectId}`);
  useProjectLayout(project);

  const { data: post, error: postError } = useSWR(`/projects/${projectId}/posts/${postId}`);

  useEffect(() => {
    if (projectError || postError) {
      navigate('/404');
    }
  }, [projectError, postError]);

  const {
    data: content,
    error: contentError,
    revalidate: revalidateContent,
  } = useSWR(`/projects/${projectId}/posts/${postId}/content`);

  const [needSubscription, setNeedSubscription] = useState(false);

  useEffect(() => {
    if (contentError && contentError.response.data.code === 4003) {
      setNeedSubscription(true);
    }
    return () => setNeedSubscription(false);
  }, [contentError]);

  const { currentUser } = useCurrentUser();
  const { data: isLike } = useSWR(currentUser ? `/projects/${projectId}/posts/${postId}/isLike` : null);

  const handleLike = async () => {
    try {
      await API.post(projectId).like({ postId });
      mutate(`/projects/${projectId}/posts/${postId}`, { ...post, likeCount: post.likeCount + 1 });
      mutate(`/projects/${projectId}/posts/${postId}/isLike`, { ...isLike, like: true });
    } catch (error) {
      handleError(error.response.data);
    }
  };

  const handleSubscription = async () => {
    try {
      const response = await API.fanPass.getAll({ projectId });
      const fanPass = response.data[0];
      const res = await API.fanPass.subscribe({
        fanPassId: fanPass.id,
        subscriptionPrice: fanPass.subscriptionPrice,
      });
      if (res.status === 200) {
        revalidateContent();
        setNeedSubscription(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const shouldShowAdultPopup = project && project.adult && !cookies[`no-warning-${projectId}`];
  const handleAdultPopupClose = () => {
    setCookie(`no-warning-${projectId}`, true, { expires: moment().add(12, 'hours').toDate(), path: '/' });
  };

  const headerLoaded = project && post;
  const contentLoaded = content && post;

  return (
    <GridTemplate>
      {shouldShowAdultPopup && <AdultPopup close={handleAdultPopupClose} />}

      <Styled.Article>
        {headerLoaded ? (
          <Header user={project.user} series={post.series} title={post.title} />
        ) : (
          <Header.Placeholder />
        )}

        {contentLoaded ? (
          <Content
            publishedAt={post && post.publishedAt}
            content={content}
            projectId={projectId}
            textmode={textmode}
          />
        ) : (
          needSubscription ? (
            <Content.Locked handleSubscription={handleSubscription} post={post} />
          ) : (
            <Content.Placeholder />
          )
        )}

        {contentLoaded && (
          <Styled.LikeButton
            likeCount={post && post.likeCount}
            isLike={isLike && isLike.like}
            onClick={handleLike}
          />
        )}
      </Styled.Article>
      {contentLoaded && isDesktop && (
        <div style={{
          position: 'absolute',
          right: '1em',
          top: '5.5em',
        }}
        >
          <Styled.ReaderModeToggle size="mini" onClick={() => setTextmode(prev => !prev)}>
            {textmode ? '일반 모드' : '읽기 모드'}
          </Styled.ReaderModeToggle>
        </div>
      )}

      {post && <PostNavigation projectId={projectId} postId={postId} series={post.series} />}
    </GridTemplate>
  );
}

PostPage.propTypes = {
  projectId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};

export default PostPage;
