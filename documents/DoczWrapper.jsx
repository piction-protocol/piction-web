import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  & > * {
    margin-bottom: 24px;
  }
`;

const DoczWrapper = ({ children }) => (
  <StyledWrapper>
    {children}
  </StyledWrapper>
);

DoczWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DoczWrapper;
