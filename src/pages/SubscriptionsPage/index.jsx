import React, { useState, useEffect, useCallback } from 'react';
import { Link, navigate } from '@reach/router';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

import useAPI from 'hooks/useAPI';
import useCurrentUser from 'hooks/useCurrentUser';

import media from 'styles/media';

import GridTemplate from 'components/templates/GridTemplate';
import UserInfo from 'components/organisms/UserInfo';
import ProjectCard from 'components/molecules/ProjectCard';
import Heading from 'components/atoms/Heading';

const Styled = {
  Heading: styled(Heading)`
    grid-column: 1 / -1;
    margin-top: var(--row-gap);
    text-align: center;
    ${media.desktop`
      padding-bottom: var(--row-gap);
      border-bottom: 1px solid var(--black);
      text-align: left;
    `}
  `,
  Link: styled(Link)`
    grid-column: 1 / -1;
    ${media.desktop`
      grid-column: span 3;
    `}
  `,
  CardText: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
};

function SubscriptionsPage() {
  const { currentUser } = useCurrentUser();
  const [projects, setProjects] = useState([]);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data } = await API.my.subscriptions({ params: { page: 1, size: 30 } });
        setProjects(data.content);
      } catch (error) {
        navigate('/404', { replace: true });
      }
    };

    getProjects();
  }, [API]);

  return (
    <GridTemplate
      hero={(
        <UserInfo
          {...currentUser}
        />
      )}
    >
      <Styled.Heading>
        {`구독 중인 프로젝트(${projects.length})`}
      </Styled.Heading>
      {projects.map(project => (
        <Styled.Link to={`/project/${project.uri}`} key={project.id}>
          <ProjectCard {...project}>
            {project.lastPublishedAt && (
              <Styled.CardText>
                {`${moment(project.lastPublishedAt).fromNow()} 업데이트`}
              </Styled.CardText>
            )}
          </ProjectCard>
        </Styled.Link>
      ))}
    </GridTemplate>
  );
}

export default SubscriptionsPage;
