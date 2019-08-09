import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';

import useAPI from 'hooks/useAPI';
import useCurrentUser from 'hooks/useCurrentUser';
import useMedia from 'hooks/useMedia';

import media, { mediaQuery } from 'styles/media';

import GridTemplate from 'components/templates/GridTemplate';
import Tabs from 'components/molecules/Tabs';
import WideProjectCard from 'components/molecules/WideProjectCard';

const ProjectInfo = React.lazy(() => import('components/organisms/ProjectInfo'));
const PostList = React.lazy(() => import('components/organisms/PostList'));

const Styled = {
  Tabs: styled(Tabs)`
    grid-column: 1 / -1;
    ${media.mobile`
      margin-right: calc(var(--outer-gap) * -1);
      margin-left: calc(var(--outer-gap) * -1);
    `}
  `,
  Content: styled.section`
    grid-column: 1 / -1;
    ${media.desktop`
      grid-column: span 9;
    `}
  `,
  Aside: styled.aside`
    display: flex;
    flex-flow: column;
    grid-column: span 3;
    > *:not(:last-child) {
      margin-bottom: 16px;
    }
  `,
  CardText: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
};

function ProjectPage({ projectId }) {
  const [project, setProject] = useState({});
  const [subscription, setSubscription] = useState({});
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
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
          currentUser && API.fanPass.get({ fanPassId }),
          currentUser && API.fanPass.getSubscription({ projectId }),
        ]);

        if (currentUser) {
          setSubscription({ ...response[2].data, isSubscribing: !!response[3].data.fanPass });
        }
        setProject({
          ...response[0].data,
          isMine: currentUser && (currentUser.loginId === response[0].data.user.loginId),
        });
        setRecommendedProjects(
          response[1].data.filter(recommended => recommended.uri !== projectId).slice(0, 4),
        );
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    getProject();
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
      <Styled.Tabs />
      <Styled.Content>
        <PostList
          isSubscribing={project.isMine || subscription.isSubscribing}
          projectId={projectId}
        />
      </Styled.Content>
      {isDesktop && (
        recommendedProjects.length > 0 && (
          <Styled.Aside>
            <h2>
              추천 프로젝트
            </h2>
            {recommendedProjects.map(recommededProject => (
              <Link
                to={`/project/${recommededProject.uri}`}
                key={recommededProject.id}
              >
                <WideProjectCard
                  {...recommededProject}
                >
                  <Styled.CardText>
                    {`구독자 수 ${recommededProject.subscriptionUserCount}`}
                  </Styled.CardText>
                </WideProjectCard>
              </Link>
            ))}
          </Styled.Aside>
        )
      )}
    </GridTemplate>
  );
}

export default ProjectPage;

ProjectPage.propTypes = {
  projectId: PropTypes.string.isRequired,
};
