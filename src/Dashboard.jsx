import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router';
import styled from 'styled-components/macro';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import useSWR from 'swr';

import { withLoginChecker } from 'components/LoginChecker';

import DashboardTemplate from 'components/templates/DashboardTemplate';

import { ReactComponent as BadMoodIcon } from 'images/ic-mood-bad.svg';

const ProjectForm = React.lazy(() => import('components/organisms/ProjectForm'));
const PostForm = React.lazy(() => import('components/organisms/PostForm'));
const DashboardPostList = React.lazy(() => import('components/organisms/DashboardPostList'));
const SponsorList = React.lazy(() => import('components/organisms/SponsorList'));
const SeriesListForm = React.lazy(() => import('components/organisms/SeriesListForm'));
const DashboardMembershipList = React.lazy(() => import('components/organisms/DashboardMembershipList'));
const MembershipForm = React.lazy(() => import('components/organisms/MembershipForm'));
const CreatorProfileFormPage = React.lazy(() => import('pages/Dashboard/CreatorProfileFormPage'));

const Styled = {
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
  const { path } = useRouteMatch();
  const { data: projects } = useSWR('my/projects', {
    revalidateOnFocus: false,
    suspense: true,
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <DashboardTemplate projects={projects}>
        <Switch>
          <Route exact path={path}>
            <Redirect to={projects.length ? `${path}/${projects[0].uri}/posts` : 'new-project'} />}
          </Route>
          <Route exact path={`${path}/new-project`}>
            {projects.length >= 5
              ? <NoMoreProject />
              : <ProjectForm title="새 프로젝트" />
            }
          </Route>
          <Route exact path={`${path}/:projectId/info`}>
            <ProjectForm title="프로젝트 정보 수정" />
          </Route>
          <Route exact path={`${path}/:projectId/posts`}>
            <DashboardPostList title="포스트 관리" />
          </Route>
          <Route exact path={`${path}/:projectId/posts/new`}>
            <PostForm title="새 포스트" />
          </Route>
          <Route exact path={`${path}/:projectId/posts/:postId/edit`}>
            <PostForm title="포스트 수정" />
          </Route>
          <Route exact path={`${path}/:projectId/series`}>
            <SeriesListForm title="시리즈 관리" />
          </Route>
          <Route exact path={`${path}/:projectId/memberships`}>
            <DashboardMembershipList title="후원 플랜 관리" />
          </Route>
          <Route exact path={`${path}/:projectId/memberships/new`}>
            <MembershipForm title="새 후원 플랜" />
          </Route>
          <Route exact path={`${path}/:projectId/memberships/:membershipId/edit`}>
            <MembershipForm title="후원 플랜 수정" />
          </Route>
          <Route extact path={`${path}/:projectId/members`}>
            <SponsorList title="구독자 목록" />
          </Route>
          <Route path={`${path}/creator-profile`} component={CreatorProfileFormPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </DashboardTemplate>
    </DndProvider>
  );
}

export default withLoginChecker(Dashboard);
