import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect, navigate } from '@reach/router';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import useSWR, { trigger } from 'swr';

import useAPI from 'hooks/useAPI';
import useCurrentUser from 'hooks/useCurrentUser';
import useMedia from 'hooks/useMedia';

import media, { mediaQuery } from 'styles/media';

import GridTemplate from 'components/templates/GridTemplate';
import Tabs from 'components/molecules/Tabs';
import ProjectInfo from 'components/organisms/ProjectInfo';
import AdultPopup from 'components/organisms/AdultPopup';

import Posts from './Posts';
import Series from './Series';

const Styled = {
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
  const [API] = useCallback(useAPI(), []);
  const isDesktop = useMedia(mediaQuery.desktop);

  const [subscribed, setSubscribed] = useState(false);
  const [myProject, setMyProject] = useState(false);

  const { data: project, error } = useSWR(`/projects/${projectId}`, { revalidateOnFocus: false });
  const { data: series } = useSWR(`/projects/${projectId}/series`, { revalidateOnFocus: false });
  const { data: recommendedProjects } = useSWR('/recommended/projects?size=5', { revalidateOnFocus: false });
  const { data: fanPass } = useSWR(`/fan-pass/projects/${projectId}`);
  const { data: subscription, revalidate: revalidateSubscription } = useSWR(() => (currentUser ? `/fan-pass/projects/${projectId}/subscription` : null));

  useEffect(() => {
    if (subscription && currentUser) {
      if (subscription.subscriber) {
        setSubscribed(true);
      } else {
        setSubscribed(false);
      }
    }
  }, [subscription, currentUser]);

  useEffect(() => {
    if (project && currentUser) {
      if (currentUser.loginId === project.user.loginId) setMyProject(true);
    }
  }, [project, currentUser]);

  const handleSubscribe = async () => {
    if (subscribed) {
      try {
        await API.fanPass.unsubscribe({
          fanPassId: fanPass[0].id,
        });
      } finally {
        revalidateSubscription();
      }
    } else {
      try {
        await API.fanPass.subscribe({
          fanPassId: fanPass[0].id,
          subscriptionPrice: fanPass[0].subscriptionPrice,
        });
      } finally {
        revalidateSubscription();
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
          isMine={myProject}
          isSubscribing={subscribed}
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
        ]}
      />

      <Router primary={false} component={({ children }) => <>{children}</>}>
        <Redirect from="/" to={`project/${projectId}/posts`} noThrow />
        <Posts
          path="posts"
          {...{
            projectId,
            project,
            subscribed: (myProject || subscribed),
            isDesktop,
            series: (series || []),
            recommendedProjects,
          }}
        />
        <Series
          path="series"
          series={series || []}
        />
      </Router>
    </GridTemplate>
  );
}

export default ProjectPage;

ProjectPage.propTypes = {
  projectId: PropTypes.string.isRequired,
};
