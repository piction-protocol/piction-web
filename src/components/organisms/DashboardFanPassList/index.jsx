import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useSWR from 'swr';

import Grid from 'styles/Grid';

import FanPass from 'components/molecules/FanPass';
import Heading from 'components/atoms/Heading';
import { PrimaryButton } from 'components/atoms/Button';

import { ReactComponent as FanPassImage } from './img-fanpass-null.svg';

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
  Center: styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: auto;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    text-align: center;
  `,
  Strong: styled.strong`
    margin: 24px auto;
    color: var(--gray--dark);
    font-size: var(--font-size--base);
    font-weight: bold;
  `,
  Link: styled(PrimaryButton).attrs(() => ({
    as: 'a',
  }))`
    margin-top: 24px;
  `,
};

function DashboardFanPassList({ title, projectId }) {
  const { data: project } = useSWR(`/projects/${projectId}`, { suspense: true });
  const { data: fanPassList } = useSWR(`/projects/${projectId}/fan-pass`, { suspense: true });

  return (
    <Styled.Container>
      <Heading>{title}</Heading>
      {project.activeFanPass ? (
        <Grid columns={9}>
          {fanPassList.map(fanPass => (
            <Styled.FanPass {...fanPass} key={fanPass.id} />
          ))}
        </Grid>
      ) : (
        <Styled.Center>
          <FanPassImage />
          <Styled.Strong>
            아직 유료 FAN PASS 관리 권한이 없습니다.
          </Styled.Strong>
          <p>
            내 창작물로 수익을 얻는 가장 쉬운 방법, FAN PASS.
            <br />
            창작자라면 누구나 FAN PASS 생성이 가능합니다.
            <br />
            지금 바로, 부담없이 신청해보세요!
          </p>
          <Styled.Link target="_blank" href="#">
            FAN PASS 권한 신청하기
          </Styled.Link>
        </Styled.Center>
      )}
    </Styled.Container>
  );
}

DashboardFanPassList.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default DashboardFanPassList;
