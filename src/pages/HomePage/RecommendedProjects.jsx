import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';

import PlaceholderImage from 'images/img-dummy-960x360.jpg';

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectThumbnail = styled.img`
  width: 295px;
  height: 148px;
  object-fit: cover;
`;

const ProjectTitle = styled.span`
  margin-top: 16px;
  font-size: 14px;
`;

const Project = ({ uri, wideThumbnail, title }) => {
  const projectPath = `/project/${uri}`;

  return (
    <Link to={projectPath}>
      <ProjectWrapper>
        <ProjectThumbnail src={wideThumbnail || PlaceholderImage} />
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
  width: 100%;
  max-width: var(--max-width);
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const ProjectListItem = styled.div`
`;

const RecommendedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    async function fetchProject() {
      const response = await API.recommended.getProjects({ params: { size: 4 } });
      const fetchedProjects = await response.data.map(p => ({
        ...p.project,
      }));
      setProjects(fetchedProjects.slice(0, 6));
    }
    fetchProject();
  }, [API]);

  return (
    <ProjectListWrapper>
      {projects.map(p => (
        <ProjectListItem key={p.id}>
          <Project {...p} />
        </ProjectListItem>
      ))}
    </ProjectListWrapper>
  );
};

export default RecommendedProjects;
