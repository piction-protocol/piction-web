import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';
import { useTranslation, withTranslation } from 'react-i18next';

import useOnScrollToBottom from 'hooks/useOnScrollToBottom';
import useCurrentUser from 'hooks/useCurrentUser';

import media from 'styles/media';

import { ReactComponent as SortIcon } from 'images/ic-sort.svg';

import GridTemplate from 'components/templates/GridTemplate';
import SeriesPostItem from 'components/molecules/SeriesPostItem';
import Heading from 'components/atoms/Heading';
import useSWR, { useSWRPages } from 'swr';
import useProjectLayout from 'hooks/useNavigationLayout';

const Styled = {
  Hero: styled.div`
    display: flex;
    position: relative;
    overflow: hidden;
    margin-bottom: 16px;
    ${media.desktop`
      max-height: 233px;
      margin-bottom: var(--row-gap);
    `}
    &::before {
      content: '';
      padding-top: 50%;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      ${({ image }) => (image ? `background-image: url(${image}), linear-gradient(to bottom, rgba(0, 0, 0, .2), rgba(0, 0, 0, .2));` : 'background-color: #333333;')}
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-blend-mode: overlay;
      transform: scale(1.1);
      filter: blur(10px);
    }
  `,
  HeroText: styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    z-index: 1;
    transform: translateY(-50%);
    color: var(--white);
    font-size: var(--font-size--small);
    text-align: center;
  `,
  Heading: styled(Heading)`
    margin-bottom: 8px;
  `,
  Section: styled.section`
    display: flex;
    grid-column: 1 / -1;
    flex-flow: column;
    ${media.desktop`
      grid-column: 3 / -3;
    `}
  `,
  Sort: styled.button.attrs({
    type: 'button',
  })`
    display: flex;
    align-items: center;
    margin-left: auto;
    font-size: var(--font-size--small);
    cursor: pointer;
    svg {
      margin-right: 4px;
    }
  `,
  SeriesPostList: styled.div`
    margin-top: 16px;
    border-top: 1px solid var(--black);
  `,
};

function SeriesPage({ projectId, seriesId }) {
  const listRef = useRef(null);
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();

  const [isDescending, setIsDescending] = useState(true);

  const { data: project } = useSWR(`/projects/${projectId}`, { revalidateOnFocus: false });
  const { data: series } = useSWR(`/projects/${projectId}/series/${seriesId}`, { revalidateOnFocus: false });
  const { data: subscription } = useSWR(currentUser ? `/projects/${projectId}/fan-passes/subscription` : null, { revalidateOnFocus: false });

  useProjectLayout(project);

  const PostsPage = ({ offset, withSWR }) => {
    const { data } = withSWR(
      useSWR(`/projects/${projectId}/series/${seriesId}/posts?isDescending=${isDescending}&page=${offset + 1}&size=20`, { revalidateOnFocus: false }),
    );

    const calculateIndex = (index) => {
      const previousIndex = data.pageable.pageNumber * data.pageable.pageSize;

      if (isDescending) {
        return data.totalElements - previousIndex - index;
      }
      return index + 1 + previousIndex;
    };

    const checkIsViewable = (post) => {
      if (!post.membership) return true;
      if (!currentUser) return false;
      const isSubscribing = subscription && subscription.membership.level >= post.membership.level;
      const isMine = project.user.loginId === currentUser.loginId;
      return isSubscribing || isMine;
    };

    if (!data || !project) {
      return (
        [...new Array(4)].map(() => (
          <SeriesPostItem.Placeholder />
        ))
      );
    }

    return data.content.map((post, index) => (
      <Link key={post.id} to={`/project/${projectId}/posts/${post.id}`}>
        <SeriesPostItem
          index={calculateIndex(index)}
          isViewable={checkIsViewable(post)}
          {...post}
        />
      </Link>
    ));
  };
  function nextOffset({ data }) {
    if (data.last) return null;
    return data.pageable.pageNumber + 1;
  }
  const {
    pages, isLoadingMore, isReachingEnd, loadMore,
  } = useSWRPages(`projects/${projectId}/series/${seriesId}`, PostsPage, nextOffset, [isDescending, project, subscription, projectId, seriesId]);

  useOnScrollToBottom(listRef, () => {
    if (isLoadingMore || isReachingEnd) return;
    loadMore();
  });

  return (
    <GridTemplate
      hero={series ? (
        <Styled.Hero image={series.thumbnails[0]}>
          <Styled.HeroText>
            <Styled.Heading>{series.name}</Styled.Heading>
            <p>
              {`${series.postCount} ${t('포스트')}`}
            </p>
          </Styled.HeroText>
        </Styled.Hero>
      ) : <Styled.Hero />}
    >
      <Styled.Section>
        <Styled.Sort onClick={() => setIsDescending(prev => !prev)}>
          <SortIcon />
          {t('정렬 변경')}
        </Styled.Sort>
        <Styled.SeriesPostList ref={listRef}>
          {pages}
        </Styled.SeriesPostList>
      </Styled.Section>
    </GridTemplate>
  );
}

export default withTranslation()(SeriesPage);

SeriesPage.propTypes = {
  projectId: PropTypes.string.isRequired,
  seriesId: PropTypes.string.isRequired,
};
