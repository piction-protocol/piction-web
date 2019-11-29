import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';
import useSWR from 'swr';

import Grid from 'styles/Grid';

import FanPass from 'components/molecules/FanPass';
import Heading from 'components/atoms/Heading';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

import { ReactComponent as PeopleIcon } from 'images/ic-people.svg';
import { ReactComponent as EditIcon } from 'images/ic-edit.svg';
import { ReactComponent as FanPassImage } from './img-fanpass-null.svg';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-flow: column;
    flex: 1;
    padding: 24px 0 48px;
    > * {
      margin-bottom: var(--row-gap);
    }
  `,
  FanPass: styled(FanPass)`
    grid-column: 1 / -1;
  `,
  Price: styled.p`
    display: flex;
    align-items: center;
    margin-top: 16px;
    font-size: 20px;
    font-weight: bold;
    font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  `,
  Subscriptions: styled.span`
    display: flex;
    align-items: center;
    margin-left: 16px;
    color: #999999;
    font-weight: bold;
    font-size: var(--font-size--tiny);
    font-family: 'Noto Sans KR', sans-serif;
  `,
  PeopleIcon: styled(PeopleIcon)`
    width: 18px;
    margin-right: 4px;
    color: vaR(--gray--dark);
  `,
  Edit: styled(Link)`
    position: absolute;
    top: 40px;
    right: 40px;
  `,
  Create: styled(SecondaryButton).attrs(() => ({
    as: Link,
  }))`
    grid-column: 4 / -4;
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
            <Styled.FanPass {...fanPass} key={fanPass.id}>
              <Styled.Price>
                {fanPass.subscriptionPrice > 0 ? `${fanPass.subscriptionPrice} PXL` : '무료'}
                <Styled.Subscriptions>
                  <Styled.PeopleIcon />
                  {fanPass.subscriptionLimit !== null
                    ? `${fanPass.subscriptionCount}/${fanPass.subscriptionLimit}`
                    : fanPass.subscriptionCount
                  }
                  명 구독 중
                </Styled.Subscriptions>
              </Styled.Price>
              <Styled.Edit to={`${fanPass.id}/edit`}>
                <EditIcon />
              </Styled.Edit>
            </Styled.FanPass>
          ))}
          {fanPassList.length <= 5 && (
            <Styled.Create to="new">
              {`+ 티어 ${fanPassList.length} 상품 추가`}
            </Styled.Create>
          )}
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
