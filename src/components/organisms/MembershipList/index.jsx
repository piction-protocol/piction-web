import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from '@reach/router';
import styled from 'styled-components/macro';
import moment from 'moment';
import 'moment/locale/ko';

import { ReactComponent as BadMoodIcon } from 'images/ic-mood-bad.svg';

import Membership from 'components/molecules/Membership';
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
  Sponsored: styled.div`
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
  Empty: styled.div`
    grid-column: 1 / -1;
    margin: 80px auto;
    color: var(--gray--dark);
    font-size: var(--font-size--base);
    text-align: center;
  `,
  BadMoodIcon: styled(BadMoodIcon)`
    width: 160px;
    height: 160px;
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
  Membership: styled(Membership).attrs(({ isPlaceholder }) => isPlaceholder && {
    as: Membership.Placeholder,
  })`
    margin-bottom: 24px;
  `,
  MembershipInfo: styled.div`
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

function MembershipList({
  isMyProject, memberships, sponsored, projectId,
}) {
  const location = useLocation();
  const [minimum, setMinimum] = useState(location?.state?.post ? location.state.post.membership.level : 0);

  return (
    <Styled.Section>
      {sponsored && sponsored.membership.level > 0 && (
        <Styled.Sponsored>
          <Styled.Name>
            {`티어 ${sponsored.membership.level} - ${sponsored.membership.name} 후원 중`}
          </Styled.Name>
          <Styled.Notice>
            후원 플랜을 업그레이드 하는 경우, 현재 후원 중인 플랜의 남은 기간은 환불되지 않습니다.
          </Styled.Notice>
        </Styled.Sponsored>
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
      {memberships.length === 0 && (
        <Styled.Empty>
          <Styled.BadMoodIcon />
          <p>
            등록된 후원 플랜이 없습니다.
          </p>
        </Styled.Empty>
      )}
      {memberships ? memberships.map((membership, index) => {
        const postCount = memberships.slice(0, index + 1).reduce((acc, val) => acc + val.postCount, 0);
        const isSubscribing = sponsored && membership.level === sponsored.membership.level;
        const isDisabled = (sponsored && membership.level < sponsored.membership.level);
        const isFull = membership.sponsorLimit !== null && membership.sponsorLimit <= membership.sponsorCount;
        return membership.level >= minimum && (
          <Styled.Membership {...membership} postCount={postCount} key={membership.id}>
            <Styled.MembershipInfo>
              <Styled.Status>
                {isSubscribing
                  ? moment(sponsored.expireDate).format('YYYY년 M월 DD일 만료')
                  : membership.sponsorLimit && (
                    isFull ? '후원 불가능'
                      : `${membership.sponsorLimit - membership.sponsorCount}명 남음`
                  )}
              </Styled.Status>
              {isSubscribing ? (
                <SecondaryButton>
                  후원 중
                </SecondaryButton>
              ) : (
                !isMyProject && (
                  <PrimaryButton
                    as={Link}
                    to={`purchase/${membership.id}`}
                    disabled={isDisabled || isFull}
                    state={{
                      postId: location?.state?.post?.id,
                      redirectTo: location?.state?.redirectTo || `${location.origin}/project/${projectId}/posts`,
                    }}
                  >
                    {`${membership.price} PXL / 30일`}
                  </PrimaryButton>
                )
              )}
            </Styled.MembershipInfo>
          </Styled.Membership>
        );
      }) : Array.from({ length: 6 }, (_, i) => (
        <Styled.Membership isPlaceholder key={i}>
          <Styled.MembershipInfo>
            <PrimaryButton disabled />
          </Styled.MembershipInfo>
        </Styled.Membership>
      ))}
    </Styled.Section>
  );
}

export default MembershipList;

MembershipList.propTypes = {
  isMyProject: PropTypes.bool,
  memberships: PropTypes.array,
  sponsored: PropTypes.object,
  location: PropTypes.object,
  projectId: PropTypes.object,
};
