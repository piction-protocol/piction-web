import React, { useEffect } from 'react';
import {
  Routes, Route, useLocation, useNavigate, useParams, Navigate,
} from 'react-router-dom';
import styled from 'styled-components/macro';

import useProject from 'hooks/useProject'
import useSubscription from 'hooks/useSubscription';
import useMedia from 'hooks/useMedia';

import { GridStyle } from 'styles/Grid';

import Alert from 'components/externals/Alert';
import GridTemplate from 'components/templates/GridTemplate';
import ProjectInfo from 'components/organisms/ProjectInfo';
import Tabs from 'components/molecules/Tabs';
import media, { mediaQuery } from 'styles/media';


const PostList = React.lazy(() => import('components/organisms/PostList'));
const SeriesList = React.lazy(() => import('components/organisms/SeriesList'));
const MembershipList = React.lazy(() => import('components/organisms/MembershipList'));
const AdultPopup = React.lazy(() => import('components/organisms/AdultPopup'));

const Styled = {
  Routes: styled(Routes)`
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

function ProjectPage() {
  const { projectId } = useParams();
  const isDesktop = useMedia(mediaQuery.desktop);
  const navigate = useNavigate();

  const {
    project,
    projectError,
    series,
    isMyProject,
    isExplicitContent,
    consentWithExplicitContent
  } = useProject(projectId)
  const postLocation = useLocation();
  const purchasePay = postLocation.search;
  const didCompletePurchase = (purchasePay === '?purchasePay');

  useEffect(() => {
    if (projectError?.response.status === 404) {
      navigate('/404', { replace: true })
    }
  }, [projectError, navigate])

  const {
    memberships,
    sponsored,
    requestToggleSubscription,
  } = useSubscription(projectId)

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

      {isExplicitContent && (
        <AdultPopup close={consentWithExplicitContent} />
      )}

      <Styled.Tabs
        links={[
          { text: '포스트', to: 'posts' },
          { text: '시리즈', to: 'series' },
          ...project?.activeMembership ? [{ text: '후원', to: 'memberships' }] : [],
        ]}
      />

      { didCompletePurchase && (
        <Alert>
          후원 플랜 결제가 완료되었습니다.
        </Alert>
      ) }

      <Styled.Routes>
        <Route path="/" element={<Navigate to="posts" replace/>} />
        <Route
          path="posts"
          element={<PostList projectId={projectId} project={project} sponsored={sponsored} isMyProject={isMyProject} />}
        />
        <Route
          path="series"
          element={<SeriesList series={series} />}
        />
        <Route
          path="memberships"
          element={<MembershipList memberships={memberships} sponsored={sponsored} isMyProject={isMyProject} />}
        />
      </Styled.Routes>
    </GridTemplate>
  );
}

export default ProjectPage;
