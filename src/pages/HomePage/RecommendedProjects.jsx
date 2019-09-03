import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';

import { MainGrid } from 'styles/Grid';
import media from 'styles/media';

import { SecondaryButton } from 'components/atoms/Button';
import ContentImage from 'components/atoms/ContentImage';

import PlaceholderImage from 'images/img-dummy-960x360.jpg';

const ProjectWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
`;

const ProjectThumbnail = styled(ContentImage)`
  ${media.mobile`
    margin: 0 -32px;
  `}
`;

const ProjectTitle = styled.span`
  margin-top: 16px;
  font-size: var(--font-size--small);
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap
`;

const ProjectAuthor = styled.span`
  margin-top: 4px;
  color: var(--gray--dark);
  font-size: var(--font-size--small);
  text-align: center;
`;

const Project = ({
  uri, wideThumbnail, title, user,
}) => {
  const projectPath = `/project/${uri}`;

  return (
    <ProjectWrapper to={projectPath}>
      <ProjectThumbnail
        ratio={360 / 180}
        image={wideThumbnail || PlaceholderImage}
      />
      <ProjectTitle>{title}</ProjectTitle>
      <ProjectAuthor>{user.username}</ProjectAuthor>
    </ProjectWrapper>
  );
};

Project.propTypes = {
  uri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  wideThumbnail: PropTypes.string,
  user: PropTypes.object.isRequired,
};

const ProjectListWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding-top: 24px;
  ${media.desktop`
    padding-top: 40px;
  `}
`;

const ProjectListItem = styled.div`
  grid-column: 1 / -1;
  min-width: 0;
  ${media.desktop`
    grid-column: span 3;
  `}
`;

const More = styled(SecondaryButton)`
  grid-column: 1 / -1;
  margin: 0 auto;
  ${media.desktop`
    margin-top: 40px;
  `}
`;

const RecommendedProjects = (props) => {
  const [projects, setProjects] = useState([]);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    async function fetchProject() {
      const response = await API.recommended.getProjects({ params: { size: 4 } });
      const fetchedProjects = await response.data.map(p => ({
        ...p,
      }));
      setProjects(fetchedProjects);
    }
    fetchProject();
  }, [API]);

  return (
    <ProjectListWrapper {...props}>
      <MainGrid>
        {projects.map(p => (
          <ProjectListItem key={p.id}>
            <Project {...p} />
          </ProjectListItem>
        ))}
        <More
          as={Link}
          to="/all"
          size="mobile-mini"
        >
          프로젝트 더 보기
        </More>
      </MainGrid>
    </ProjectListWrapper>
  );
};

export default RecommendedProjects;
