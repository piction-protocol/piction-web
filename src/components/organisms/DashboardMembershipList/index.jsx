import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import useSWR from 'swr';

import Grid from 'styles/Grid';

import Membership from 'components/molecules/Membership';
import Heading from 'components/atoms/Heading';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

import { ReactComponent as PeopleIcon } from 'images/ic-people.svg';
import { ReactComponent as EditIcon } from 'images/ic-edit.svg';

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
  Membership: styled(Membership)`
    grid-column: 1 / -1;
  `,
  Price: styled.p`
    display: flex;
    align-items: center;
    margin-top: 16px;
    font-size: 20px;
    font-weight: bold;
    font-family: var(--poppins);
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

function DashboardMembershipList({ title }) {
  const { projectId } = useParams();
  const { url } = useRouteMatch();
  const { data: project } = useSWR(`/projects/${projectId}`, { suspense: true });
  const { data: membershipList } = useSWR(`/projects/${projectId}/memberships`, { suspense: true });

  return (
    <Styled.Container>
      <Heading>{title}</Heading>
      {project.activeMembership ? (
        <Grid columns={9}>
          {membershipList.map(membership => membership.price > 0 && (
            <Styled.Membership {...membership} key={membership.id}>
              <Styled.Price>
                {`${membership.price} PXL`}
                <Styled.Subscriptions>
                  <Styled.PeopleIcon />
                  {membership.sponsorLimit !== null
                    ? `${membership.sponsorCount}/${membership.sponsorLimit}`
                    : membership.sponsorCount
                  }
                  명 구독 중
                </Styled.Subscriptions>
              </Styled.Price>
              <Styled.Edit to={`${url}/${membership.id}/edit`}>
                <EditIcon />
              </Styled.Edit>
            </Styled.Membership>
          ))}
          {membershipList.length <= 5 && (
            <Styled.Create to={`${url}/new`}>
              {`+ 티어 ${membershipList.length} 상품 추가`}
            </Styled.Create>
          )}
        </Grid>
      ) : (
        <Styled.Center>
          <Styled.Strong>
            후원 플랜 관리 권한이 없습니다.
          </Styled.Strong>
          <Styled.Link target="_blank" href="http://bit.ly/piction_sponsorship_plan">
            권한 신청하기
          </Styled.Link>
        </Styled.Center>
      )}
    </Styled.Container>
  );
}

DashboardMembershipList.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default DashboardMembershipList;
