import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';

import Grid, { MainGrid } from 'styles/Grid';
import media from 'styles/media';

import Thumbnail from 'components/atoms/ContentImage/Thumbnail';

const Styled = {
  Container: styled.section`
    display: flex;
    flex-flow: column;
    width: 100%;
    padding-top: 16px;
    ${media.desktop`
      padding-top: 40px;
    `}
  `,
  MainImage: styled(Thumbnail)`
    grid-column: 1 / -1;
  `,
  Texts: styled.div`
    ${media.mobile`
      z-index: 1;
      grid-column: 1 / -1;
      margin: -64px var(--outer-gap) 20px;
      padding-top: 20px;
      background-color: var(--white);
      text-align: center;
    `}
  `,
  Name: styled.p`
    margin-bottom: 8px;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
  `,
  Title: styled.h2`
    margin-bottom: 8px;
    font-size: 18px;
  `,
  SubTitle: styled.p`
    color: #999999;
  `,
  ProjectList: styled(Grid).attrs(() => ({
    columns: 8,
  }))`
    ${media.mobile`
      --column-gap: 12px;
      grid-column: 1 / -1;
      grid-template-columns: auto;
      grid-auto-flow: column;
      grid-auto-columns: calc(50% - var(--outer-gap) - var(--column-gap));
      margin: 0 calc(-1 * var(--outer-gap)) 16px;
      padding-bottom: 24px;
      overflow-x: scroll;
      scroll-snap-type: x proximity;
      -webkit-overflow-scrolling: touch;
      &::before, &::after {
        content: '';
        width: calc(var(--outer-gap) - var(--column-gap));
      }
    `}
    ${media.desktop`
      grid-column: 5 / -1;
    `}
  `,
  ProjectListItem: styled.li`
    scroll-snap-align: center;
    ${media.desktop`
      grid-column: span 2;
    `}
  `,
  Project: styled(Link)`
    display: flex;
    flex-flow: column;
  `,
  ProjectTitle: styled.span`
    margin-top: 12px;
    overflow: hidden;
    font-size: var(--font-size--small);
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};

const Choice = (props) => {
  const [projects, setProjects] = useState([]);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    async function fetchProject() {
      const response = await API.recommended.getProjects({ params: { size: 4 } });
      const fetchedProjects = response.data.map(p => ({
        ...p,
      }));
      setProjects(fetchedProjects);
    }
    fetchProject();
  }, [API]);

  return (
    <Styled.Container {...props}>
      <MainGrid>
        <Styled.MainImage
          image="https://placekitten.com/800/800"
        />
        <Styled.Texts>
          <Styled.Name>
            Piction’s Choice
          </Styled.Name>
          <Styled.Title>
            회전목마
          </Styled.Title>
          <Styled.SubTitle>
            말 돌리기 바빠~
          </Styled.SubTitle>
        </Styled.Texts>
        <Styled.ProjectList>
          {projects.map(project => (
            <Styled.ProjectListItem key={project.id}>
              <Styled.Project to={`/project/${project.uri}`}>
                <Thumbnail image={project.thumbnail} />
                <Styled.ProjectTitle>{project.title}</Styled.ProjectTitle>
              </Styled.Project>
            </Styled.ProjectListItem>
          ))}
        </Styled.ProjectList>
      </MainGrid>
    </Styled.Container>
  );
};

export default Choice;
