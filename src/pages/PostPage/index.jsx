import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import 'moment/locale/ko';
import useSWR, { mutate } from 'swr';
import { navigate } from '@reach/router';

import media from 'styles/media';

import useProjectLayout from 'hooks/useNavigationLayout';
import useCurrentUser from 'hooks/useCurrentUser';
import useAPI from 'hooks/useAPI';
import useLocalStorage from 'hooks/useLocalStorage';

import GridTemplate from 'components/templates/GridTemplate';
import PostNavigation from 'components/organisms/PostNavigation';
import LikeButton from 'components/atoms/LikeButton';

import Header from './Header';
import Content from './Content';
import ReaderModeControl from './ReaderModeControl';

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
};

function PostPage({ projectId, postId }) {
  const [readerMode, setReaderMode] = useLocalStorage(`project/${projectId}/textmode`, false);
  const [cookies, setCookie] = useCookies([`no-warning-${projectId}`]);
  const [API, handleError] = useCallback(useAPI(), []);

  const { data: project, error: projectError } = useSWR(`/projects/${projectId}`, { revalidateOnFocus: false });
  useProjectLayout(project);

  const { data: post, error: postError } = useSWR(`/projects/${projectId}/posts/${postId}`, { revalidateOnFocus: false });

  useEffect(() => {
    if (projectError || postError) {
      navigate('/404');
    }
  }, [projectError, postError]);

  const {
    data: content,
    error: contentError,
    revalidate: revalidateContent,
  } = useSWR(`/projects/${projectId}/posts/${postId}/content`, { revalidateOnFocus: false, shouldRetryOnError: false });

  const [needSubscription, setNeedSubscription] = useState(false);

  useEffect(() => {
    if (contentError && contentError.response.data.code === 4003) {
      setNeedSubscription(true);
    }
    return () => setNeedSubscription(false);
  }, [contentError]);

  const { currentUser } = useCurrentUser();
  const { data: isLike } = useSWR(currentUser ? `/projects/${projectId}/posts/${postId}/isLike` : null, { revalidateOnFocus: false });

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
      const response = await API.fanPass.subscribe({
        projectId,
        fanPassId: post.fanPass.id,
        subscriptionPrice: post.fanPass.subscriptionPrice,
      });
      if (response.status === 200) {
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
    <GridTemplate
      style={readerMode ? {
        backgroundColor: '#e8eff4',
        marginBottom: '0',
      } : null}
    >
      {shouldShowAdultPopup && <AdultPopup close={handleAdultPopupClose} />}

      <Styled.Article>
        {headerLoaded ? (
          <Header user={project.user} series={post.series} title={post.title} />
        ) : (
          <Header.Placeholder />
        )}

        {contentLoaded && (
          <ReaderModeControl readerMode={readerMode} onToggle={mode => setReaderMode(mode)} />
        )}

        {contentLoaded ? (
          <Content
            publishedAt={post && post.publishedAt}
            content={content}
            projectId={projectId}
            readerMode={readerMode}
          />
        ) : (
          // FIXME: needSubscription을 관리하는 코드를 개선
          post && post.fanPass && needSubscription ? (
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
      {post && <PostNavigation projectId={projectId} postId={postId} series={post.series} />}
    </GridTemplate>
  );
}

PostPage.propTypes = {
  projectId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};

export default PostPage;
