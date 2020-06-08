import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';
import queryString from 'query-string';
import useSWR, { useSWRPages } from 'swr';
import { useTranslation, withTranslation } from 'react-i18next';

import useOnScrollToBottom from 'hooks/useOnScrollToBottom';

import media from 'styles/media';

import GridTemplate from 'components/templates/GridTemplate';
import ProjectCard from 'components/molecules/ProjectCard';
import Heading from 'components/atoms/Heading';

const Styled = {
  Hero: styled.div`
    margin-bottom: 16px;
    padding: 24px var(--outer-gap);
    background-color: var(--blue);
    background-size: cover;
    background-position: center;
    color: var(--white);
    text-align: center;
    ${media.desktop`
      margin-bottom: 48px;
      padding: 48px 0;
    `}
  `,
  Count: styled.p`
    margin-top: 4px;
    font-size: var(--font-size--small);
  `,
  Link: styled(Link)`
    grid-column: span 3;
  `,
  CardText: styled.p`
    overflow: hidden;
    color: var(--gray);
    font-size: var(--font-size--small);
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};

function Search({ location: { search } }) {
  const { query } = queryString.parse(search, { decode: false });

  const FETCHING_SIZE = 20;
  const [totalCount, setTotalCount] = useState(0);
  const { t } = useTranslation();
  function FoundProjectsPage({ offset, withSWR }) {
    const { data } = withSWR(
      useSWR(`/search/projects?name=${query}&size=${FETCHING_SIZE}&page=${offset + 1}`),
    );

    if (!data) {
      return (
        [...new Array(4)].map(() => (
          <Styled.Link to="#">
            <ProjectCard.Placeholder />
          </Styled.Link>
        ))
      );
    }

    setTotalCount(data.totalElements);

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
  } = useSWRPages(`search-page/${query}`, FoundProjectsPage, nextOffset, [query]);

  const listRef = useRef(null);
  useOnScrollToBottom(listRef, () => {
    if (isLoadingMore || isReachingEnd) return;
    loadMore();
  });

  return (
    <GridTemplate
      hero={(
        <Styled.Hero>
          <Heading>
            {`"${decodeURIComponent(query) || ''}" ${t('검색 결과')}`}
          </Heading>
          <Styled.Count>
            {`${totalCount} ${t('프로젝트')}`}
          </Styled.Count>
        </Styled.Hero>
      )}
      ref={listRef}
    >
      {pages}
    </GridTemplate>
  );
}

Search.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withTranslation()(Search);
