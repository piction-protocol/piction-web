import React, {
  useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';
import queryString from 'query-string';

import useAPI from 'hooks/useAPI';

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
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};

function Search({ location: { search } }) {
  const [projects, setProjects] = useState([]);
  const [page] = useState(1);
  const [count, setCount] = useState(0);
  const [API] = useCallback(useAPI(), []);

  const { query } = queryString.parse(search);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data } = await API.search.project({
          params: { name: query, size: 100, page },
        });
        setProjects(data.content);
        setCount(data.numberOfElements);
      } catch (error) {
        setProjects([]);
        setCount(0);
      }
    };

    getProjects();
  }, [API, page, query]);

  return (
    <GridTemplate
      hero={(
        <Styled.Hero>
          <Heading>
            {`"${query || ''}" 검색 결과`}
          </Heading>
          <Styled.Count>
            {`${count} 프로젝트`}
          </Styled.Count>
        </Styled.Hero>
      )}
    >
      {projects.map(project => (
        <Styled.Link to={`/project/${project.uri}`} key={project.id}>
          <ProjectCard {...project}>
            <Styled.CardText>
              {project.user.username}
            </Styled.CardText>
          </ProjectCard>
        </Styled.Link>
      ))}
    </GridTemplate>
  );
}

Search.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Search;
