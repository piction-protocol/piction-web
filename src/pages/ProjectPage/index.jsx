import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect, navigate } from '@reach/router';
import styled from 'styled-components/macro';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import useSWR, { trigger, mutate } from 'swr';

import useAPI from 'hooks/useAPI';
import useCurrentUser from 'hooks/useCurrentUser';
import useMedia from 'hooks/useMedia';

import { GridStyle } from 'styles/Grid';

import GridTemplate from 'components/templates/GridTemplate';
import ProjectInfo from 'components/organisms/ProjectInfo';
import Tabs from 'components/molecules/Tabs';
import media, { mediaQuery } from 'styles/media';

const PostList = React.lazy(() => import('components/organisms/PostList'));
const SeriesList = React.lazy(() => import('components/organisms/SeriesList'));
const SponsorshipList = React.lazy(() => import('components/organisms/SponsorshipList'));
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
  const [cookies, setCookie] = useCookies();
  const { currentUser } = useCurrentUser();
  const [API] = useCallback(useAPI(), [projectId]);
  const isDesktop = useMedia(mediaQuery.desktop);

  const { data: project, error } = useSWR(`/projects/${projectId}`, { revalidateOnFocus: false });
  const { data: series = [] } = useSWR(`/projects/${projectId}/series`, { revalidateOnFocus: false });
  const { data: [subscription, ...sponsorships] = [] } = useSWR(`/projects/${projectId}/memberships`);
  const { data: sponsored } = useSWR(() => (currentUser ? `/projects/${projectId}/memberships/sponsorship` : null));
  const isMyProject = currentUser?.loginId === project?.user.loginId;

  const handleSubscribe = async () => {
    if (subscription) {
      try {
        await API.fanPass.unsubscribe({
          projectId,
          fanPassId: subscription.id,
        });
      } finally {
        mutate(`/projects/${projectId}/fan-passes/subscription`, null);
      }
    } else {
      try {
        await API.fanPass.subscribe({
          projectId,
          fanPassId: subscription.id,
          sponsorshipPrice: subscription.sponsorshipPrice,
        });
      } finally {
        trigger(`/projects/${projectId}/fan-passes/subscription`);
      }
    }
    trigger(`/projects/${projectId}`);
  };

  const handleCookie = () => {
    setCookie(`no-warning-${projectId}`, true, { expires: moment().add(12, 'hours').toDate(), path: '/' });
  };

  if (error) {
    navigate('/404', { replace: true });
  }

  return (
    <GridTemplate
      hero={project ? (
        <ProjectInfo
          project={project}
          isMyProject={isMyProject}
          subscription={subscription}
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
          ...project?.activeMembership ? [{ text: '후원', to: 'sponsorships' }] : [],
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
        <SponsorshipList
          path="sponsorships"
          sponsorships={sponsorships}
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
