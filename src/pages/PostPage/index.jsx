import React, {
  useState, useEffect, useCallback, useContext,
} from 'react';
import PropTypes from 'prop-types';
import { Location, Link } from '@reach/router';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import 'moment/locale/ko';

import useAPI from 'hooks/useAPI';
import useCurrentUser from 'hooks/useCurrentUser';

import ContentStyle from 'styles/ContentStyle';
import media from 'styles/media';

import { LayoutContext } from 'context/LayoutContext';

import GridTemplate from 'components/templates/GridTemplate';
import PostNavigation from 'components/organisms/PostNavigation';
import Spinner from 'components/atoms/Spinner';
import Heading from 'components/atoms/Heading';
import LikeButton from 'components/atoms/LikeButton';
import ContentImage from 'components/atoms/ContentImage';
import { PrimaryButton } from 'components/atoms/Button';

import dummyThumbnailImage from 'images/img-dummy-500x500.jpg';
import { ReactComponent as LockedIcon } from 'images/ic-locked.svg';

const AdultPopup = React.lazy(() => import('components/organisms/AdultPopup'));

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
  SeriesName: styled(Link)`
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
  User: styled.div`
    display: flex;
    margin-top: 8px;
    font-size: var(--font-size--small);
    ${media.desktop`
      margin-top: 16px;
      align-items: center;
      font-size: var(--font-size--base);
      font-weight: bold;
    `}
  `,
  UserPicture: styled(ContentImage)`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 8px;
    ${media.desktop`
      width: 27px;
      height: 27px;
    `}
  `,
  Locked: styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    color: var(--gray--dark);
    line-height: var(--line-height--content);
    text-align: center;
    word-break: keep-all;
    ${media.desktop`
      margin: 96px 0;
    `}
  `,
  LockedIcon: styled(LockedIcon)`
    width: 104px;
    height: 104px;
    margin-bottom: 8px;
    path {
      fill: var(--gray--light);
    }
    ${media.desktop`
      margin-bottom: 24px;
    `}
  `,
  Subscription: styled(PrimaryButton)`
    margin-top: 16px;
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
    margin: 48px auto 24px;
  `,
};

function PostPage({ projectId, postId }) {
  const [data, setData] = useState({});
  const [isLocked, setIsLocked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cookies, setCookie] = useCookies([`no-warning-${projectId}`]);
  const { currentUser } = useCurrentUser();
  const [API, handleError] = useCallback(useAPI(), []);
  const [, setLayout] = useContext(LayoutContext);

  useEffect(() => {
    const getPost = async () => {
      try {
        const [project, post, isLike] = await Promise.all([
          API.project.get({ projectId }),
          API.post(projectId).get({ postId }),
          (currentUser && API.post(projectId).getIsLike({ postId })),
        ]);
        setData({
          project: project.data,
          post: post.data,
          isLike: currentUser ? isLike.data.like : false,
        });
      } catch (error) {
        handleError(error.response.data);
      }

      try {
        const content = await API.post(projectId).getContent({ postId });
        setData(rest => ({
          ...rest,
          content: content.data.content,
        }));
      } catch (error) {
        setIsLocked(true);
      } finally {
        setIsLoaded(true);
      }
    };

    getPost();
    return (() => {
      setData({});
      setIsLocked(false);
      setIsLoaded(false);
    });
  }, [currentUser, API, handleError, postId, projectId]);

  useEffect(() => {
    if (isLoaded) {
      setLayout({
        type: 'project',
        data: {
          project: data.project,
        },
      });
    }

    return (() => {
      setLayout({ type: 'default' });
    });
  }, [isLoaded, data.project, setLayout]);

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

  const handleCookie = () => {
    setCookie(`no-warning-${projectId}`, true, { expires: moment().add(12, 'hours').toDate(), path: '/' });
  };

  const handleSubscribe = async () => {
    try {
      const response = await API.fanPass.getAll({ projectId });
      const fanPass = response.data[0];
      await API.fanPass.subscribe({
        fanPassId: fanPass.id,
        subscriptionPrice: fanPass.subscriptionPrice,
      });
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return isLoaded ? (
    <GridTemplate>
      {(data.project.adult && !cookies[`no-warning-${projectId}`]) && (
        <AdultPopup close={handleCookie} />
      )}
      <Styled.Container>
        <Styled.Info>
          {data.post.series && (
            <Styled.SeriesName
              to={`../../series/${data.post.series.id}`}
            >
              {data.post.series.name}
            </Styled.SeriesName>
          )}
          <Heading>
            {data.post.title}
          </Heading>
          <Styled.User>
            <Styled.UserPicture
              ratio={500 / 500}
              image={data.project.user.picture || dummyThumbnailImage}
            />
            {data.project.user.username}
          </Styled.User>
        </Styled.Info>
        {isLocked ? (
          <Styled.Locked>
            <Styled.LockedIcon />
            구독자 전용 포스트입니다.
            {currentUser ? (
              <Styled.Subscription
                onClick={handleSubscribe}
              >
                무료로 구독하기
              </Styled.Subscription>
            ) : (
              <Location>
                {({ location }) => (
                  <Styled.Subscription
                    as={Link}
                    to="/login"
                    state={{
                      redirectTo: encodeURIComponent(location.pathname),
                    }}
                  >
                    무료로 구독하기
                  </Styled.Subscription>
                )}
              </Location>
            )}
          </Styled.Locked>
        ) : (
          <>
            <Styled.Content
              dangerouslySetInnerHTML={{
                __html: data.content,
              }}
            />
            <Styled.Date>
              {`${moment(data.post.publishedAt).format('ll HH:mm')} 발행`}
            </Styled.Date>
            <Styled.LikeButton
              likeCount={data.post.likeCount}
              isLike={data.isLike}
              onClick={handleLike}
            />
          </>
        )}
      </Styled.Container>
      <PostNavigation projectId={projectId} postId={postId} series={data.post.series} />
    </GridTemplate>
  ) : (<Spinner />);
}

export default PostPage;

PostPage.propTypes = {
  projectId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};
