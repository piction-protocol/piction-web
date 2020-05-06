import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';
import useSWR, { useSWRPages } from 'swr';

import useOnScrollToBottom from 'hooks/useOnScrollToBottom';

import media from 'styles/media';

import GridTemplate from 'components/templates/GridTemplate';
import ProjectCard from 'components/molecules/ProjectCard';
import SwitchTabs from 'components/molecules/SwitchTabs';

import HeroBackgroundImage from 'images/img-projects.png';

const Styled = {
  Hero: styled.div`
    margin-bottom: 40px;
    padding: 48px var(--outer-gap);
    background-image: url(${HeroBackgroundImage});
    background-size: cover;
    background-position: center;
    color: var(--blue);
    text-align: center;
    ${media.desktop`
      margin-bottom: 48px;
      padding: 75px 0;
    `}
  `,
  Link: styled(Link)`
    grid-column: span 3;
    overflow: hidden;
  `,
  CardText: styled.p`
    overflow: hidden;
    color: var(--gray);
    font-size: var(--font-size--small);
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  SwitchTabs: styled(SwitchTabs)`
    grid-column: 1 / -1;
  `,
};

function ExplorePage({ listName }) {
  const FETCHING_SIZE = 20;

  const listRef = useRef(null);
  const endpoint = {
    all: '/projects',
    memberships: '/projects/supports',
  };

  function ProjectsPage({ offset, withSWR }) {
    const { data } = withSWR(
      useSWR(() => `${endpoint[listName]}?size=${FETCHING_SIZE}&page=${offset + 1}`),
    );

    if (!data) {
      return [...new Array(FETCHING_SIZE)].map(() => (
        <Styled.Link to="#">
          <ProjectCard.Placeholder />
        </Styled.Link>
      ));
    }

    return data.content.map(project => (
      <Styled.Link to={`/project/${project.uri}`} key={project.id}>
        <ProjectCard {...project}>
          <Styled.CardText>
            {project.user.username}
          </Styled.CardText>
        </ProjectCard>
      </Styled.Link>
    ));
  }

  function nextOffset({ data }) {
    if (data.last) return null;
    return data.pageable.pageNumber + 1;
  }

  const {
    pages,
    isLoadingMore,
    isReachingEnd,
    loadMore,
  } = useSWRPages('all-projects', ProjectsPage, nextOffset, [listName]);

  useOnScrollToBottom(listRef, () => {
    if (isLoadingMore || isReachingEnd) return;
    loadMore();
  });

  return (
    <GridTemplate
      hero={(
        <Styled.Hero>
          일러스트부터 버츄얼 유튜버까지,
          <br />
          <b>픽션을 즐겨보세요.</b>
        </Styled.Hero>
      )}
      ref={listRef}
    >
      <Styled.SwitchTabs
        links={[
          { text: '전체 프로젝트', to: '/explore/all' },
          { text: '후원 프로젝트', to: '/explore/memberships' },
        ]}
      />
      {pages}
    </GridTemplate>
  );
}

ExplorePage.propTypes = {
  listName: PropTypes.string.isRequired,
};

export default ExplorePage;
