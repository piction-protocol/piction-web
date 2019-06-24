import React from 'react';
import { Router, Redirect } from '@reach/router';

import DashboardTemplate from 'components/templates/DashboardTemplate';

import { ProjectProvider } from 'context/ProjectContext';

const ProjectForm = React.lazy(() => import('components/organisms/ProjectForm'));

const NotFound = () => (
  <div>개발중</div>
);


function Dashboard() {
  return (
    <DashboardTemplate>
      <Router primary={false}>
        <Redirect from="/" to={[].length ? 'dashboard/1' : 'dashboard/new-project'} />
        <ProjectForm path="new-project" />
        <ProjectProvider path=":projectId">
          <ProjectForm path="info" />
        </ProjectProvider>
        <NotFound default />
      </Router>
    </DashboardTemplate>
  );
}


export default Dashboard;
