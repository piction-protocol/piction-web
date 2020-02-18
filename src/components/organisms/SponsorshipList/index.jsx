import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';
import moment from 'moment';
import 'moment/locale/ko';

import Plan from 'components/molecules/Sponsorship';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

const Styled = {
  Section: styled.section`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -1;
  `,
  P: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Sponsorship: styled.div`
    margin-bottom: 12px;
    padding: 24px;
    background-color: #ffe7e8;
    border-radius: 4px;
    text-align: center;
  `,
  Post: styled.div`
    margin-bottom: 12px;
    padding: 24px;
    border-radius: 4px;
    background-color: #f1f9ff;
    text-align: center;
  `,
  Name: styled.p`
    margin-bottom: 8px;
    font-size: var(--font-size--small);
    font-weight: bold;
  `,
  Notice: styled.p`
    color: #a3a3a3;
    font-size: var(--font-size--tiny);
  `,
  Plan: styled(Plan).attrs(({ isPlaceholder }) => isPlaceholder && {
    as: Plan.Placeholder,
  })`
    margin-bottom: 24px;
  `,
  PlanInfo: styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    margin-top: 16px;
  `,
  Subscribe: styled.div`
    padding-top: 16px;
  `,
  Status: styled.p`
    margin-bottom: 12px;
    color: #999999;
    font-size: var(--font-size--tiny);
    font-weight: bold;
  `,
};

function SponsorshipList({ sponsorships, sponsored, location }) {
  const [minimum, setMinimum] = useState(location.state.post ? location.state.post.plan.level : 0);

  return (
    <Styled.Section>
      {sponsored && sponsored.plan.level > 0 && (
        <Styled.Sponsorship>
          <Styled.Name>
            {`티어 ${sponsored.plan.level} - ${sponsored.plan.name} 후원 중`}
          </Styled.Name>
          <Styled.Notice>
            후원 플랜을 업그레이드 하는 경우, 현재 후원 중인 플랜의 남은 기간은 환불되지 않습니다.
          </Styled.Notice>
        </Styled.Sponsorship>
      )}
      {minimum > 0 && location.state.post && (
        <Styled.Post>
          <Styled.Name>
            {location.state.post.title}
          </Styled.Name>
          <Styled.Notice>
            포스트를 볼 수 있는 후원 플랜만 출력합니다.
          </Styled.Notice>
          <PrimaryButton onClick={() => setMinimum(0)} size="mini" style={{ marginTop: 16 }}>
            전체 후원 플랜 보기
          </PrimaryButton>
        </Styled.Post>
      )}
      {sponsorships ? sponsorships.map((plan, index) => {
        const postCount = sponsorships.slice(0, index + 1).reduce((acc, val) => acc + val.postCount, 0);
        const isSubscribing = sponsored && plan.level === sponsored.plan.level;
        const isDisabled = (sponsored && plan.level < sponsored.plan.level);
        const isFull = plan.sponsorshipLimit !== null && plan.sponsorshipLimit <= plan.sponsorshipCount;
        return plan.level >= minimum && (
          <Styled.Plan {...plan} postCount={postCount} key={plan.id}>
            <Styled.PlanInfo>
              <Styled.Status>
                {
                  isFull ? '후원 불가능'
                    : isSubscribing && moment(sponsored.expireDate).format('YYYY년 M월 DD일 만료')
                }
              </Styled.Status>
              {isSubscribing ? (
                <SecondaryButton>
                  후원 중
                </SecondaryButton>
              ) : (
                <PrimaryButton
                  as={Link}
                  to={`purchase/${plan.id}`}
                  disabled={isDisabled || isFull}
                >
                  {`${plan.sponsorshipPrice} PXL / 30일`}
                </PrimaryButton>
              )}
            </Styled.PlanInfo>
          </Styled.Plan>
        );
      }) : Array.from({ length: 6 }, (_, i) => (
        <Styled.Plan isPlaceholder key={i}>
          <Styled.PlanInfo>
            <PrimaryButton disabled />
          </Styled.PlanInfo>
        </Styled.Plan>
      ))}
    </Styled.Section>
  );
}

export default SponsorshipList;

SponsorshipList.propTypes = {
  sponsorships: PropTypes.array,
  sponsored: PropTypes.object,
  location: PropTypes.object,
};
