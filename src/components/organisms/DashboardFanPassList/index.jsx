import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useSWR from 'swr';

import Grid from 'styles/Grid';

import FanPass from 'components/molecules/FanPass';
import Heading from 'components/atoms/Heading';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-flow: column;
    flex: 1;
    padding: 24px 0 48px;
    font-size: var(--font-size--small);
    > * {
      margin-bottom: var(--row-gap);
    }
  `,
  FanPass: styled(FanPass)`
    grid-column: 1 / -1;
  `,
};

function DashboardFanPassList({ title, projectId }) {
  const { data: fanPassList } = useSWR(`/projects/${projectId}/fan-pass`, { suspense: true });

  return (
    <Styled.Container>
      <Heading>{title}</Heading>
      {true ? (
        <Grid columns={9}>
          {fanPassList.map(fanPass => (
            <Styled.FanPass {...fanPass} />
          ))}
        </Grid>
      ) : (
        <div>
          아직 유료 FAN PASS 관리 권한이 없습니다.
        </div>
      )}
    </Styled.Container>
  );
}

DashboardFanPassList.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default DashboardFanPassList;
