import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import media from 'styles/media';
import { MainGrid } from 'styles/Grid';

import DashboardSidebar from 'components/organisms/DashboardSidebar';

const Styled = {
  MainGrid: styled(MainGrid)`
    flex: 1;
    grid-auto-rows: 100%;
  `,
  Sidebar: styled(DashboardSidebar)`
    grid-column: 1 / -1;
    ${media.desktop`
      grid-column: 1 / span 3;
    `}
  `,
  Content: styled.section`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -1;
    ${media.desktop`
      grid-column: span 9;
      margin-left: 20px;
    `}
  `,
  ContentWrapper: styled.div`
    display: flex;
    height: 100%;
  `,
};

function DashboardTemplate({ projects, children }) {
  return (
    <Styled.MainGrid as="main" role="main">
      <Styled.Sidebar projects={projects} />
      <Styled.Content>
        <Styled.ContentWrapper>
          {children}
        </Styled.ContentWrapper>
      </Styled.Content>
    </Styled.MainGrid>
  );
}

DashboardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  projects: PropTypes.array.isRequired,
};

export default DashboardTemplate;
