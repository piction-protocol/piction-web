import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect } from '@reach/router';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import moment from 'moment';

import useAPI from 'hooks/useAPI';
import useCurrentUser from 'hooks/useCurrentUser';
import useMedia from 'hooks/useMedia';

import media, { mediaQuery } from 'styles/media';

import GridTemplate from 'components/templates/GridTemplate';
import Tabs from 'components/molecules/Tabs';

const AdultPopup = React.lazy(() => import('components/organisms/AdultPopup'));
const ProjectInfo = React.lazy(() => import('components/organisms/ProjectInfo'));
const Posts = React.lazy(() => import('./Posts'));
const Series = React.lazy(() => import('./Series'));

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
  const [project, setProject] = useState({});
  const [subscription, setSubscription] = useState({});
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [series, setSeries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cookies, setCookie] = useCookies([`no-warning-${projectId}`]);
  const { currentUser } = useCurrentUser();
  const [API] = useCallback(useAPI(), []);
  const isDesktop = useMedia(mediaQuery.desktop);

  useEffect(() => {
    const getProject = async () => {
      try {
        const fanPass = await API.fanPass.getAll({ projectId });
        const fanPassId = fanPass.data[0].id;
        const response = await Promise.all([
          API.project.get({ projectId }),
          API.recommended.getProjects({ params: { size: 5 } }),
          API.series(projectId).getAll(),
          currentUser && API.fanPass.get({ fanPassId }),
          currentUser && API.fanPass.getSubscription({ projectId }),
        ]);

        if (currentUser) {
          setSubscription({ ...response[3].data, isSubscribing: !!response[4].data.fanPass });
        }
        setProject({
          ...response[0].data,
          isMine: currentUser && (currentUser.loginId === response[0].data.user.loginId),
        });
        setSeries(response[2].data);
        setRecommendedProjects(
          response[1].data.filter(recommended => recommended.uri !== projectId).slice(0, 4),
        );
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    getProject();

    return () => {
      setProject({});
      setSubscription({});
      setRecommendedProjects([]);
      setIsLoaded(false);
    };
  }, [currentUser, API, projectId]);

  const handleSubscribe = async () => {
    if (subscription.isSubscribing) {
      try {
        await API.fanPass.unsubscribe({
          fanPassId: subscription.id,
        });
        setSubscription(prev => ({ ...prev, isSubscribing: false }));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await API.fanPass.subscribe({
          fanPassId: subscription.id,
          subscriptionPrice: subscription.subscriptionPrice,
        });
        setSubscription(prev => ({ ...prev, isSubscribing: true }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCookie = () => {
    setCookie(`no-warning-${projectId}`, true, { expires: moment().add(12, 'hours').toDate(), path: '/' });
  };

  return isLoaded && (
    <GridTemplate
      hero={(
        <ProjectInfo
          project={project}
          subscription={subscription}
          handleSubscribe={handleSubscribe}
        />
      )}
    >
      {(project.adult && !cookies[`no-warning-${projectId}`]) && (
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
            projectId, project, subscription, isDesktop, series, recommendedProjects,
          }}
        />
        <Series
          path="series"
          series={series}
        />
      </Router>
    </GridTemplate>
  );
}

export default ProjectPage;

ProjectPage.propTypes = {
  projectId: PropTypes.string.isRequired,
};
