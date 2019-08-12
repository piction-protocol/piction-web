import React, { useState, useEffect } from 'react';
import { Router, Redirect } from '@reach/router';
import styled from 'styled-components';

import useAPI from 'hooks/useAPI';

import withLoginChecker from 'components/LoginChecker';

import DashboardTemplate from 'components/templates/DashboardTemplate';

import { ReactComponent as BadMoodIcon } from 'images/ic-mood-bad.svg';

const ProjectForm = React.lazy(() => import('components/organisms/ProjectForm'));
const PostForm = React.lazy(() => import('components/organisms/PostForm'));
const DashboardPostList = React.lazy(() => import('components/organisms/DashboardPostList'));

const Styled = {
  Router: styled(Router)`
    display: flex;
    height: 100%;
  `,
  Container: styled.section`
    margin: auto;
    color: var(--gray--dark);
    font-size: var(--font-size--base);
    text-align: center;
  `,
  BadMoodIcon: styled(BadMoodIcon)`
    width: 160px;
    height: 160px;
  `,
};

const NoMoreProject = () => (
  <Styled.Container>
    <Styled.BadMoodIcon />
    <p>
      최대 프로젝트 보유 가능 수를 초과하여
      <br />
      새 프로젝트를 만들 수 없습니다.
    </p>
  </Styled.Container>
);

const NotFound = () => (
  <Styled.Container>
    <Styled.BadMoodIcon />
    <p>
      페이지를 찾을 수 없습니다.
    </p>
  </Styled.Container>
);

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [API] = useAPI();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data } = await API.my.projects();
        await setProjects(data);
      } finally {
        setIsLoaded(true);
      }
    };

    getProjects();
    // eslint-disable-next-line
  }, []);

  return (
    <DashboardTemplate projects={projects}>
      {isLoaded && (
        <Styled.Router primary={false}>
          <Redirect from="/" to={projects.length ? `dashboard/${projects[0].uri}/posts` : 'dashboard/new-project'} noThrow />
          {projects.length >= 3
            ? <NoMoreProject path="new-project" />
            : <ProjectForm title="새 프로젝트" path="new-project" setProjects={setProjects} />
          }
          <ProjectForm title="프로젝트 정보 수정" path=":projectId/info" setProjects={setProjects} />

          <Redirect from="/:projectId" to="dashboard/:projectId/posts" noThrow />
          <DashboardPostList title="포스트 관리" path=":projectId/posts" />
          <PostForm title="새 포스트" path=":projectId/posts/new" />
          <PostForm title="포스트 수정" path=":projectId/posts/:postId/edit" />
          <NotFound default />
        </Styled.Router>
      )}
    </DashboardTemplate>
  );
}


export default withLoginChecker(Dashboard);
