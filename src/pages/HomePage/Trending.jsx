import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import useSWR from 'swr';

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
  Author: styled.div`
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
  const FETCHING_SIZE = 6;
  const isDesktop = useMedia(mediaQuery.desktop);

  const { data: projects } = useSWR(`/projects/trending?size=${FETCHING_SIZE}`, { revalidateOnFocus: false });

  return projects ? (
    <Styled.Section {...props}>
      <Styled.Texts>
        <Styled.Title>
          Trending
        </Styled.Title>
        <Styled.SubTitle>
          지금 주목받는 프로젝트. 놓치지 마세요!
        </Styled.SubTitle>
      </Styled.Texts>
      {projects ? projects.map(project => (
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
      )) : ''}
    </Styled.Section>
  ) : <Trending.Placeholder {...props} />;
};

Trending.Placeholder = props => (
  <Styled.Section {...props}>
    <Styled.Texts>
      <Styled.Title>
        Trending
      </Styled.Title>
      <Styled.SubTitle>
        지금 주목받는 프로젝트. 놓치지 마세요!
      </Styled.SubTitle>
    </Styled.Texts>
    {[...new Array(6)].map(() => (
      <Styled.Link to="#">
        <Styled.ProjectCard.Placeholder />
      </Styled.Link>
    ))}
  </Styled.Section>
);

export default Trending;
