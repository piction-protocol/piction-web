import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { navigate } from '@reach/router';

import media from 'styles/media';

import usePost from 'hooks/usePost';
import useSubscription from 'hooks/useSubscription';
import useProjectLayout from 'hooks/useNavigationLayout';
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

  const {
    project,
    projectError,
    post,
    postError,
    content,
    revalidateContent,
    needSponsorship,
    like,
    handleLike,
    isExplicitContent,
    consentWithExplicitContent
  } = usePost(projectId, postId);

  const { sponsored, requestSubscription } = useSubscription(projectId)

  useEffect(() => {
    if (sponsored && !content) {
      revalidateContent()
    }
  }, [sponsored, content, revalidateContent])

  useProjectLayout(project);

  useEffect(() => {
    if (projectError || postError) {
      navigate('/404');
    }
  }, [projectError, postError]);

  const headerLoaded = project && post;
  const contentLoaded = content && post;

  return (
    <GridTemplate
      style={readerMode ? {
        backgroundColor: '#e8eff4',
        marginBottom: '0',
      } : null}
    >
      {isExplicitContent && <AdultPopup close={consentWithExplicitContent} />}

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
          // FIXME: needSponsorship을 관리하는 코드를 개선
          post && post.membership && needSponsorship ? (
            <Content.Locked handleSubscription={requestSubscription} post={post} redirectTo={window.location.href} />
          ) : (
            <Content.Placeholder />
          )
        )}

        {contentLoaded && (
          <Styled.LikeButton
            likeCount={post && post.likeCount}
            isLiked={like}
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
