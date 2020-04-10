import React, { useCallback } from 'react';
import {
  Routes, Route, useLocation, useNavigate, useParams, Navigate,
} from 'react-router-dom';
import styled from 'styled-components/macro';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import useSWR, { trigger, mutate } from 'swr';

import useAPI from 'hooks/useAPI';
import useCurrentUser from 'hooks/useCurrentUser';
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
  const [cookies, setCookie] = useCookies();
  const { currentUser } = useCurrentUser();
  const [API] = useCallback(useAPI(), [projectId]);
  const isDesktop = useMedia(mediaQuery.desktop);
  const navigate = useNavigate();

  const { data: project, projectError } = useSWR(`/projects/${projectId}`, { revalidateOnFocus: false });
  const { data: series = [] } = useSWR(`/projects/${projectId}/series`, { revalidateOnFocus: false });
  const { data: [subscription, ...memberships] = [] } = useSWR(`/projects/${projectId}/memberships`);
  const { data: sponsored } = useSWR(() => (currentUser ? `/projects/${projectId}/memberships/sponsorship` : null));
  const isMyProject = currentUser?.loginId === project?.user.loginId;
  const postLocation = useLocation();
  const purchasePay = postLocation.search;
  const didCompletePurchase = (purchasePay === '?purchasePay');

  const handleSubscribe = async () => {
    if (sponsored) {
      try {
        await API.membership.unsubscribe({
          projectId,
          membershipId: subscription.id,
        });
        mutate(`/projects/${projectId}/memberships/sponsorship`, null);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await API.membership.subscribe({
          projectId,
          membershipId: subscription.id,
          sponsorshipPrice: subscription.price,
        });
        mutate(`/projects/${projectId}/memberships/sponsorship`, data);
      } catch (error) {
        console.log(error);
      }
    }
    trigger(`/projects/${projectId}`);
  };

  const handleCookie = () => {
    setCookie(`no-warning-${projectId}`, true, { expires: moment().add(12, 'hours').toDate(), path: '/' });
  };

  if (projectError) {
    navigate('/404', { replace: true });
  }

  return (
    <GridTemplate
      hero={project ? (
        <ProjectInfo
          project={project}
          isMyProject={isMyProject}
          sponsored={sponsored}
          handleSubscribe={handleSubscribe}
        />
      ) : (
        <ProjectInfo.Placeholder isDesktop={isDesktop} />
      )}
    >

      {(project && project.adult && !cookies[`no-warning-${projectId}`]) && (
        <AdultPopup close={handleCookie} />
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
        <Route path="/" element={<Navigate to="posts" />} />
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
