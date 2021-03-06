import React from 'react';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';
import styled from 'styled-components/macro';
import moment from 'moment';
import 'moment/locale/ko';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import placeholder from 'styles/placeholder';

import GridTemplate from 'components/templates/GridTemplate';
import CreatorProfile from 'components/organisms/CreatorProfile';
import ProjectCard from 'components/molecules/ProjectCard';
import UserProfile from 'components/atoms/ContentImage/UserProfile';
import Heading from 'components/atoms/Heading';

const Styled = {
  UserProfile: styled(UserProfile)`
    grid-column: 3 / -3;
    margin-top: 40px;
    border-radius: 50%;
  `,
  Heading: styled(Heading)`
    ${placeholder}
  `,
  Id: styled.p`
    margin-top: 4px;
    color: var(--gray);
    font-size: var(--font-size--small);
  `,
  Projects: styled.section`
    display: contents;
  `,
  ProjectsTitle: styled.h2`
    grid-column: 1 / -1;
    padding-top: 16px;
    border-top: 1px solid var(--gray);
    font-size: 24px;
  `,
  Link: styled(Link)`
    grid-column: span 3;
  `,
  CardText: styled.p`
    color: var(--gray);
    font-size: var(--font-size--small);
  `,
};

function CreatorProfilePage({ creatorId }) {
  const { t } = useTranslation();
  const { data: user, error: userError } = useSWR(`users/${creatorId}`);
  const { data: profile = { greetings: '', links: [] } } = useSWR(`creator-profiles/users/${creatorId}`, {
    shouldRetryOnError: false,
  });
  const { data: projects = [] } = useSWR(`creator-profiles/users/${creatorId}/projects`, {
    shouldRetryOnError: false,
  });

  if (userError) {
    navigate('/404');
  }

  return (
    <GridTemplate>
      {user ? (
        <CreatorProfile
          user={user}
          profile={profile}
        />
      ) : (
        <CreatorProfile.Placeholder />
      )}
      <Styled.Projects>
        <Styled.ProjectsTitle>
          {t('프로젝트')}
        </Styled.ProjectsTitle>
        {projects.map(project => (
          <Styled.Link to={`/project/${project.uri}`} key={project.id}>
            <ProjectCard {...project}>
              {project.lastPublishedAt && (
                <Styled.CardText>
                  {`${moment(project.lastPublishedAt).fromNow()} ${t('업데이트')}`}
                </Styled.CardText>
              )}
            </ProjectCard>
          </Styled.Link>
        ))}
      </Styled.Projects>
    </GridTemplate>
  );
}

export default CreatorProfilePage;

CreatorProfilePage.propTypes = {
  creatorId: PropTypes.string.isRequired,
};
