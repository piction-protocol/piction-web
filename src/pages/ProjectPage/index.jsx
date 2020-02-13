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
import media, { mediaQuery } from 'styles/media';

import GridTemplate from 'components/templates/GridTemplate';
import PostList from 'components/organisms/PostList';
import SeriesList from 'components/organisms/SeriesList';
import ProjectInfo from 'components/organisms/ProjectInfo';
import AdultPopup from 'components/organisms/AdultPopup';
import Tabs from 'components/molecules/Tabs';

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
      padding: 0 var(--outer-gap);
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
  const { data: fanPass } = useSWR(`/projects/${projectId}/fan-passes`);
  const { data: subscription } = useSWR(() => (currentUser ? `/projects/${projectId}/fan-passes/subscription` : null));

  const handleSubscribe = async () => {
    if (subscription) {
      try {
        await API.fanPass.unsubscribe({
          projectId,
          fanPassId: fanPass[0].id,
        });
      } finally {
        mutate(`/projects/${projectId}/fan-passes/subscription`, null);
      }
    } else {
      try {
        await API.fanPass.subscribe({
          projectId,
          fanPassId: fanPass[0].id,
          subscriptionPrice: fanPass[0].subscriptionPrice,
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
          hasFanPasses={fanPass && fanPass.length > 1}
          isMyProject={currentUser?.loginId === project?.user.loginId}
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
          { text: '후원', to: 'sponsorships' },
        ]}
      />

      <Styled.Router primary={false}>
        <Redirect from="/" to="posts" noThrow />
        <PostList
          path="posts"
          projectId={projectId}
          project={project}
          subscription={subscription}
          isMyProject={currentUser?.loginId === project?.user.loginId}
        />
        <SeriesList
          path="series"
          series={series}
        />
      </Styled.Router>
    </GridTemplate>
  );
}

export default ProjectPage;

ProjectPage.propTypes = {
  projectId: PropTypes.string.isRequired,
};
