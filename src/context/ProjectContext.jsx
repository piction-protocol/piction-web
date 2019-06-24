import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import useCurrentUser from 'hooks/useCurrentUser';

const ProjectContext = createContext();

const ProjectProvider = ({ children, projectId }) => {
  const [projectData, setProjectData] = useState({});
  const { accessToken } = useCurrentUser();

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const result = await axios.get(`http://api-iro.piction.network/projects/${projectId}`, {
          headers: {
            'X-Auth-Token': accessToken,
          },
        });
        setProjectData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectData();
  }, [accessToken, projectId]);

  return (
    <ProjectContext.Provider value={projectData}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
  projectId: PropTypes.string.isRequired,
};
