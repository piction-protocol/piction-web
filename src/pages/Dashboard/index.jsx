import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect } from '@reach/router';

import useAPI from 'hooks/useAPI';

import withLoginChecker from 'components/LoginChecker';

import DashboardTemplate from 'components/templates/DashboardTemplate';

const ProjectForm = React.lazy(() => import('components/organisms/ProjectForm'));
const PostForm = React.lazy(() => import('components/organisms/PostForm'));
const DashboardPostList = React.lazy(() => import('components/organisms/DashboardPostList'));

const NotFound = () => (
  <div>개발중</div>
);

const Project = ({ children }) => children;

Project.propTypes = {
  children: PropTypes.node.isRequired,
};

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [API] = useAPI();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data } = await API.my.projects();
        await setProjects(data);
      } catch (error) {
        console.log(error);
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
        <Router>
          <Redirect from="/" to={projects.length ? `dashboard/${projects[0].uri}/posts/1` : 'dashboard/new-project'} noThrow />
          <ProjectForm title="새 프로젝트" path="new-project" setProjects={setProjects} />
          <Project path=":projectId">
            <ProjectForm title="프로젝트 정보 수정" path="info" setProjects={setProjects} />
            <DashboardPostList title="포스트 관리" path="posts" />
            <DashboardPostList title="포스트 관리" path="posts/:page" />
            <PostForm title="새 포스트" path="posts/new" />
            <PostForm title="포스트 수정" path="posts/:postId/edit" />
          </Project>
          <NotFound default />
        </Router>
      )}
    </DashboardTemplate>
  );
}


export default withLoginChecker(Dashboard);
