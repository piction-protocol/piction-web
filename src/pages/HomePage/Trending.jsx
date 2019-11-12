import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';
import useMedia from 'hooks/useMedia';

import { MainGrid } from 'styles/Grid';
import media, { mediaQuery } from 'styles/media';

import ProjectCard from 'components/molecules/ProjectCard';
import UserProfile from 'components/atoms/ContentImage/UserProfile';

const Styled = {
  Section: styled(MainGrid).attrs({
    as: 'section',
  })`
    margin: 40px auto 80px;
  `,
  Texts: styled.div`
    ${media.mobile`
      z-index: 1;
      grid-column: 1 / -1;
      padding-top: 40px;
      text-align: center;
    `}
    ${media.desktop`
      grid-column: span 3;
      grid-row: 1 / span 2;
    `}
  `,
  Title: styled.h2`
    margin-bottom: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 32px;
    ${media.desktop`
      margin-bottom: 20px;
      font-size: 40px;
      &::after {
        content: '';
        display: block;
        width: 32px;
        margin-top: 20px;
        border-top: 1px solid var(--gray--dark);
      }
    `}
  `,
  SubTitle: styled.p`
    color: #999999;
    font-size: var(--font-size--small);
  `,
  Link: styled(Link)`
    grid-column: span 3;
  `,
  ProjectCard: styled(ProjectCard)`
    height: 100%;
  `,
  Synopsis: styled.p`
    max-height: 40px;
    margin-bottom: 12px;
    overflow: hidden;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Author: styled.p`
    display: flex;
    align-items: center;
    margin-top: auto;
    color: #999999;
    font-size: 13px;
  `,
  UserProfile: styled(UserProfile)`
    width: 32px;
    margin-right: 12px;
    border-radius: 50%;
    overflow: hidden;
  `,
  LoginId: styled.span`
    color: var(--gray--dark);
    font-size: 12px;
  `,
};

const Trending = (props) => {
  const [projects, setProjects] = useState([]);
  const [API] = useCallback(useAPI(), []);
  const isDesktop = useMedia(mediaQuery.desktop);

  useEffect(() => {
    async function fetchProject() {
      const response = await API.project.getTrendingProjects({ params: { size: 6 } });
      const fetchedProjects = response.data.map(p => ({
        ...p,
      }));
      setProjects(fetchedProjects);
    }
    fetchProject();
  }, [API]);

  return (
    <Styled.Section {...props}>
      <Styled.Texts>
        <Styled.Title>
          Trending
        </Styled.Title>
        <Styled.SubTitle>
          지금 주목받는 프로젝트. 놓치지 마세요!
        </Styled.SubTitle>
      </Styled.Texts>
      {projects.map(project => (
        <Styled.Link to={`/project/${project.uri}`} key={project.id}>
          <Styled.ProjectCard {...project}>
            {isDesktop ? (
              <>
                <Styled.Synopsis>
                  {project.synopsis}
                </Styled.Synopsis>
                <Styled.Author>
                  <Styled.UserProfile
                    image={project.user.picture}
                  />
                  <div>
                    {project.user.username}
                    <br />
                    <Styled.LoginId>
                      @
                      {project.user.loginId}
                    </Styled.LoginId>
                  </div>
                </Styled.Author>
              </>
            ) : (
              <Styled.Author>
                {project.user.username}
              </Styled.Author>
            )}
          </Styled.ProjectCard>
        </Styled.Link>
      ))}
    </Styled.Section>
  );
};

export default Trending;
