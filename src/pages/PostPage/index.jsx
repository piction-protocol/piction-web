import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useLocation, useHistory, useParams } from 'react-router-dom';

import media from 'styles/media';

import usePost from 'hooks/usePost';
import useSubscription from 'hooks/useSubscription';
import useProjectLayout from 'hooks/useNavigationLayout';
import useLocalStorage from 'hooks/useLocalStorage';

import Alert from 'components/externals/Alert';
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

function PostPage() {
  const { projectId, postId } = useParams();
  const [readerMode, setReaderMode] = useLocalStorage(`project/${projectId}/textmode`, false);
  // FIXME: history에 대한 직접 접근 제거
  const history = useHistory()

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

  const postLocation = useLocation();
  const purchasePay = postLocation.search;
  const didCompletePurchase = (purchasePay === '?purchasePay');

  useEffect(() => {
    if (sponsored && !content) {
      revalidateContent()
    }
  }, [sponsored, content, revalidateContent])

  useProjectLayout(project);

  useEffect(() => {
    if (projectError || postError) {
      history.push('/404');
    }
  }, [projectError, postError, history]);

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

      { didCompletePurchase && (
        <Alert>
          후원 플랜 결제가 완료되었습니다.
        </Alert>
      ) }

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

export default PostPage;
