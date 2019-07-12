import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';

import { MainGrid } from 'styles/Grid';
import media from 'styles/media';

import ContentImage from 'components/atoms/ContentImage';

import PlaceholderImage from 'images/img-dummy-960x360.jpg';

const ProjectWrapper = styled.div`
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
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap
`;

const Project = ({ uri, wideThumbnail, title }) => {
  const projectPath = `/project/${uri}`;

  return (
    <Link to={projectPath}>
      <ProjectWrapper>
        <ProjectThumbnail
          ratio={360 / 180}
          image={wideThumbnail || PlaceholderImage}
        />
        <ProjectTitle>{title}</ProjectTitle>
      </ProjectWrapper>
    </Link>
  );
};

Project.propTypes = {
  uri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  wideThumbnail: PropTypes.string,
};

const ProjectListWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

const ProjectListItem = styled.div`
  grid-column: 1 / -1;
  ${media.desktop`
    grid-column: span 3;
  `}
`;

const RecommendedProjects = (props) => {
  const [projects, setProjects] = useState([]);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    async function fetchProject() {
      const response = await API.recommended.getProjects({ params: { size: 4 } });
      const fetchedProjects = await response.data.map(p => ({
        ...p.project,
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
      </MainGrid>
    </ProjectListWrapper>
  );
};

export default RecommendedProjects;
