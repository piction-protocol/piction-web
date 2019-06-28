import React from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect } from '@reach/router';

import DashboardTemplate from 'components/templates/DashboardTemplate';

const ProjectForm = React.lazy(() => import('components/organisms/ProjectForm'));

const NotFound = () => (
  <div>개발중</div>
);

const Project = ({ children }) => (
  <div>{children}</div>
);

Project.propTypes = {
  children: PropTypes.node.isRequired,
};

function Dashboard() {
  return (
    <DashboardTemplate>
      <Router primary={false}>
        <Redirect from="/" to={[].length ? 'dashboard/1' : 'dashboard/new-project'} />
        <ProjectForm title="새 프로젝트" path="new-project" />
        <Project path=":projectId">
          <ProjectForm title="프로젝트 정보 수정" path="info" />
          <NotFound default />
        </Project>
      </Router>
    </DashboardTemplate>
  );
}


export default Dashboard;
