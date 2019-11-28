import React, { useRef } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import useSWR, { useSWRPages } from 'swr';

import useOnScrollToBottom from 'hooks/useOnScrollToBottom';

import media from 'styles/media';

import GridTemplate from 'components/templates/GridTemplate';
import ProjectCard from 'components/molecules/ProjectCard';
import Heading from 'components/atoms/Heading';

import HeroBackgroundImage from 'images/img-projects.png';

const Styled = {
  Hero: styled.div`
    margin-bottom: 16px;
    padding: 48px var(--outer-gap);
    background-image: url(${HeroBackgroundImage});
    background-size: cover;
    background-position: center;
    color: var(--blue);
    text-align: center;
    ${media.desktop`
      margin-bottom: 48px;
      padding: 80px 0;
    `}
  `,
  P: styled.p`
    margin-top: 4px;
    font-size: var(--font-size--small);
    ${media.desktop`
      margin-top: 8px;
    `}
  `,
  Link: styled(Link)`
    grid-column: span 3;
    overflow: hidden;
  `,
  CardText: styled.p`
    overflow: hidden;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};

function AllProjectsPage() {
  const FETCHING_SIZE = 20;

  const listRef = useRef(null);

  function ProjectsPage({ offset, withSWR }) {
    const { data } = withSWR(
      useSWR(() => `/projects?size=${FETCHING_SIZE}&page=${offset + 1}`),
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
  } = useSWRPages('all-projects', ProjectsPage, nextOffset, []);

  useOnScrollToBottom(listRef, () => {
    if (isLoadingMore || isReachingEnd) return;
    loadMore();
  });

  return (
    <GridTemplate
      hero={(
        <Styled.Hero>
          <Heading>
            전체 프로젝트
          </Heading>
          <Styled.P>
            일러스트부터 버츄얼 유튜버까지, 픽션을 즐겨보세요.
          </Styled.P>
        </Styled.Hero>
      )}
      ref={listRef}
    >
      {pages}
    </GridTemplate>
  );
}

export default AllProjectsPage;
