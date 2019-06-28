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
};

function DashboardTemplate({ children }) {
  return (
    <Styled.Main>
      <Grid>
        <DashboardSidebar columns={3} />
        <div columns={9}>
          {children}
        </div>
      </Grid>
    </Styled.Main>
  );
}

DashboardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardTemplate;
