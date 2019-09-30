import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import useAPI from 'hooks/useAPI';
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
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pageable, setPageable] = useState({});
  const listRef = useRef(null);

  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data: { content: projectsData, ...pageableData } } = await API.project.getAll({
          params: { size: 20, page },
        });
        setPageable(pageableData);

        if (pageableData.first) {
          setProjects(projectsData);
        } else {
          setProjects(prev => [...prev, ...projectsData]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
  }, [API, page]);

  useOnScrollToBottom(listRef, () => {
    if (!pageable.last) {
      setPage(prev => prev + 1);
    }
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

export default AllProjectsPage;
