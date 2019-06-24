import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Grid from 'styles/Grid';

import DashboardSidebar from 'components/organisms/DashboardSidebar';

const Styled = {
  Main: styled.main.attrs({
    role: 'main',
  })`
    display: flex;
    flex-flow: column;
    flex: 1;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--gap);
  `,
  Sidebar: styled(DashboardSidebar)`
    grid-column: span 3;
  `,
  Container: styled.section`
    grid-column: span 9;
  `,
};

function DashboardTemplate({ children }) {
  return (
    <Styled.Main>
      <Grid>
        <Styled.Sidebar />
        <Styled.Container>
          {children}
        </Styled.Container>
      </Grid>
    </Styled.Main>
  );
}

DashboardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardTemplate;
