import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';

import useAPI from 'hooks/useAPI';
import useCurrentUser from 'hooks/useCurrentUser';

import media from 'styles/media';

import GridTemplate from 'components/templates/GridTemplate';
import Tabs from 'components/molecules/Tabs';

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
    display: none;
    ${media.desktop`
      display: flex;
      flex-flow: column;
      grid-column: span 3;
    `}
  `,
};

function ProjectPage({ projectId }) {
  const [project, setProject] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentUser } = useCurrentUser();
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await API.project.get({ projectId });
        await setProject(data);
        setIsLoaded(true);
      } catch (error) {
        navigate('/404', { replace: true });
      }
    };

    getProject();
  }, [API, projectId]);

  return isLoaded && (
    <GridTemplate
      hero={(
        <ProjectInfo
          isMine={currentUser.loginId === project.user.loginId}
          project={project}
        />
      )}
    >
      <Styled.Tabs />
      <Styled.Content>
        <PostList
          isSubscribed={!!project.subscription}
          projectId={projectId}
        />
      </Styled.Content>
      <Styled.Aside>
      </Styled.Aside>
    </GridTemplate>
  );
}

export default ProjectPage;

ProjectPage.propTypes = {
  projectId: PropTypes.string.isRequired,
};
