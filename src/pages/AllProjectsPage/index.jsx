import React, { useRef } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import axios from 'axios';
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

/**
 * FIXME: Custom fetcher 함수를 구현해서 별도로 분리해야 합니다. POC 구현을 간단하게 하기 위해 그냥 여기에 복붙합니다.
 */
async function fetcher(args) {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://api-stg.piction.network/',
    headers: {
      'X-Device-Platform': 'web',
      accept: 'application/vnd.piction.v1+json',
    },
  });
  const res = await API.get(args);
  return res.data;
}


function AllProjectsPage() {
  const FETCHING_SIZE = 20;
  const listRef = useRef(null);

  /**
   * TODO: 필요에 따라서 별도로 분리합니다. 여기 있어도 크게 상관없긴 할 것 같습니다.
   *
   * 가져온 데이터로 구성할 페이지 컴포넌트
   */
  function ProjectsPage({ offset, withSWR }) {
    const { data } = withSWR(
      useSWR(() => `/projects?size=${FETCHING_SIZE}&page=${offset + 1}`, fetcher),
    );

    if (!data) return <span>Loading</span>;
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

  /**
   * SWR 데이터를 가지고 다음 페이지의 offset을 계산하는 함수
   * 다음 페이지가 없을 때는 null을 호출해야 하는 것으로 보이지만 공식 문서에 언급은 없음
   */
  function nextOffset(data) {
    if (data.last) return null;
    return data.pageable.pageNumber + 1;
  }

  const {
    pages,
    isLoadingMore,
    isReachingEnd,
    loadMore,
  } = useSWRPages(
    'all-projects',
    ProjectsPage,
    nextOffset,
    [],
  );

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
