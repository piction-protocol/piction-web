import React from 'react';
import PropTypes from 'prop-types';
import {
  Router, Redirect,
} from '@reach/router';
import styled from 'styled-components/macro';

import useProject from 'hooks/useProject'
import useMedia from 'hooks/useMedia';

import { GridStyle } from 'styles/Grid';

import GridTemplate from 'components/templates/GridTemplate';
import ProjectInfo from 'components/organisms/ProjectInfo';
import Tabs from 'components/molecules/Tabs';
import media, { mediaQuery } from 'styles/media';

const PostList = React.lazy(() => import('components/organisms/PostList'));
const SeriesList = React.lazy(() => import('components/organisms/SeriesList'));
const MembershipList = React.lazy(() => import('components/organisms/MembershipList'));
const AdultPopup = React.lazy(() => import('components/organisms/AdultPopup'));

const Styled = {
  Router: styled(Router)`
    grid-column: 1 / -1;
    ${GridStyle}
  `,
  Tabs: styled(Tabs)`
    grid-column: 1 / -1;
    margin-bottom: -24px;
    ${media.mobile`
      margin-right: calc(var(--outer-gap) * -1);
      margin-left: calc(var(--outer-gap) * -1);
    `}
  `,
};

function ProjectPage({ projectId }) {
  const isDesktop = useMedia(mediaQuery.desktop);

  const {
    project,
    series,
    memberships,
    sponsored,
    isMyProject,
    requestToggleSubscription,
    showOverlay,
    supressOverlay
  } = useProject(projectId)

  return (
    <GridTemplate
      hero={project ? (
        <ProjectInfo
          project={project}
          isMyProject={isMyProject}
          sponsored={sponsored}
          onToggleSubscription={requestToggleSubscription}
        />
      ) : (
        <ProjectInfo.Placeholder isDesktop={isDesktop} />
      )}
    >

      {showOverlay && (
        <AdultPopup close={supressOverlay} />
      )}

      <Styled.Tabs
        links={[
          { text: '포스트', to: 'posts' },
          { text: '시리즈', to: 'series' },
          ...project?.activeMembership ? [{ text: '후원', to: 'memberships' }] : [],
        ]}
      />

      <Styled.Router primary={false}>
        <Redirect from="/" to="posts" noThrow />
        <PostList
          path="posts"
          projectId={projectId}
          project={project}
          sponsored={sponsored}
          isMyProject={isMyProject}
        />
        <SeriesList
          path="series"
          series={series}
        />
        <MembershipList
          path="memberships"
          memberships={memberships}
          sponsored={sponsored}
          isMyProject={isMyProject}
        />
      </Styled.Router>
    </GridTemplate>
  );
}

export default ProjectPage;

ProjectPage.propTypes = {
  projectId: PropTypes.string.isRequired,
};
