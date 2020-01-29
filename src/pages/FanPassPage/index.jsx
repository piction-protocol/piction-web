import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';
import useSWR, { mutate, trigger } from 'swr';
import moment from 'moment';
import 'moment/locale/ko';

import media from 'styles/media';

import useAPI from 'hooks/useAPI';
import useProjectLayout from 'hooks/useNavigationLayout';

import withLoginChecker from 'components/LoginChecker';

import GridTemplate from 'components/templates/GridTemplate';
import FanPass from 'components/molecules/FanPass';
import Thumbnail from 'components/atoms/ContentImage/Thumbnail';
import Heading from 'components/atoms/Heading';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

const Styled = {
  Thumbnail: styled(Thumbnail)`
    grid-column: 3 / -3;
    margin-top: 40px;
    border-radius: 50%;
    ${media.desktop`
      grid-column: 6 / -6;
    `}
  `,
  Header: styled.header`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -1;
    text-align: center;
    ${media.desktop`
      grid-column: 4 / -4;
    `}
  `,
  Heading: styled(Heading)`
    margin-bottom: 4px;
    font-family: var(--poppins);
    font-size: 36px;
    ${media.desktop`
      font-size: 40px;
    `}
  `,
  P: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Subscription: styled.div`
    margin-top: 12px;
    padding: 24px;
    background-color: #ffe7e8;
  `,
  Post: styled.div`
    margin-top: 12px;
    padding: 24px;
    background-color: #f1f9ff;
  `,
  Name: styled.p`
    margin-bottom: 8px;
    font-size: var(--font-size--small);
    font-weight: bold;
  `,
  Notice: styled.p`
    color: #999999;
    font-size: var(--font-size--tiny);
  `,
  FanPass: styled(FanPass).attrs(({ isPlaceholder }) => isPlaceholder && {
    as: FanPass.Placeholder,
  })`
    grid-column: 1 / -1;
    ${media.desktop`
      grid-column: 4 / -4;
    `}
  `,
  FanPassInfo: styled.div`
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

function FanPassPage({ projectId, location }) {
  const { data: project } = useSWR(`/projects/${projectId}`, { revalidateOnFocus: false });
  const { data: fanPassList } = useSWR(`/projects/${projectId}/fan-passes`, { revalidateOnFocus: false });
  const {
    data: subscription,
  } = useSWR(() => (`/projects/${projectId}/fan-passes/subscription`));
  const [minimum, setMinimum] = useState(location.state.post ? location.state.post.fanPass.level : 0);
  useProjectLayout(project);

  const [API] = useCallback(useAPI(), []);

  const handleSubscribe = async (fanPass) => {
    if (subscription) {
      try {
        await API.fanPass.unsubscribe({
          projectId,
          fanPassId: fanPass.id,
        });
        mutate(`/projects/${projectId}/fan-passes/subscription`, null);
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      try {
        await API.fanPass.subscribe({
          projectId,
          fanPassId: fanPass.id,
          subscriptionPrice: fanPass.subscriptionPrice,
        });
        trigger(`/projects/${projectId}/fan-passes/subscription`);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    trigger(`/projects/${projectId}`);
  };

  return (
    <GridTemplate>
      <Styled.Thumbnail image={project ? project.thumbnail : null} />
      <Styled.Header>
        <Styled.Heading>
          FAN PASS
        </Styled.Heading>
        {project && (
          <Styled.P>
            <b>
              {project.user.username}
            </b>
            님의 창작 활동을 직접 응원해보세요.
          </Styled.P>
        )}
        {subscription && subscription.fanPass.level > 0 && (
          <Styled.Subscription>
            <Styled.Name>
              {`티어 ${subscription.fanPass.level} - ${subscription.fanPass.name} 구독 중`}
            </Styled.Name>
            <Styled.Notice>
              FAN PASS를 업그레이드 하는 경우, 현재 사용 중인 상품의 남은 기간은 환불되지 않습니다.
            </Styled.Notice>
          </Styled.Subscription>
        )}
        {minimum > 0 && location.state.post && (
          <Styled.Post>
            <Styled.Name>
              {location.state.post.title}
            </Styled.Name>
            <Styled.Notice>
              해당 포스트를 볼 수 있는 FAN PASS 상품만 출력됩니다.
            </Styled.Notice>
            <PrimaryButton onClick={() => setMinimum(0)} size="mini" style={{ marginTop: 16 }}>
              전체 상품 보기
            </PrimaryButton>
          </Styled.Post>
        )}
      </Styled.Header>
      {fanPassList ? fanPassList.map((fanPass, index) => {
        const postCount = fanPassList.slice(0, index + 1).reduce((acc, val) => acc + val.postCount, 0);
        const isFree = fanPass.level === 0;
        const isSubscribing = subscription && fanPass.level === subscription.fanPass.level;
        const isDisabled = (subscription && fanPass.level < subscription.fanPass.level);
        const isFull = fanPass.subscriptionLimit && fanPass.subscriptionLimit <= fanPass.subscriptionCount;
        return fanPass.level >= minimum && (
          <Styled.FanPass {...fanPass} postCount={postCount} key={fanPass.id}>
            <Styled.FanPassInfo>
              <Styled.Status>
                {
                  isFull ? '판매 종료'
                    : isDisabled ? '구독 불가능'
                      : isSubscribing && !isFree && moment(subscription.expireDate).format('YYYY년 M월 DD일 만료')
                }
              </Styled.Status>
              {isSubscribing ? (
                <SecondaryButton onClick={() => isFree && handleSubscribe(fanPass)}>
                  구독 중
                </SecondaryButton>
              ) : (
                <PrimaryButton
                  {...isFree ? {
                    onClick: () => isFree && handleSubscribe(fanPass),
                  } : {
                    as: Link,
                    to: `purchase/${fanPass.id}`,
                  }}
                  disabled={isDisabled || isFull}
                >
                  {isFree ? '구독하기' : `${fanPass.subscriptionPrice} PXL / 30일`}
                </PrimaryButton>
              )}
            </Styled.FanPassInfo>
          </Styled.FanPass>
        );
      }) : Array.from({ length: 6 }, (_, i) => (
        <Styled.FanPass isPlaceholder key={i}>
          <Styled.FanPassInfo>
            <PrimaryButton disabled />
          </Styled.FanPassInfo>
        </Styled.FanPass>
      ))}
    </GridTemplate>
  );
}

export default withLoginChecker(FanPassPage);

FanPassPage.propTypes = {
  projectId: PropTypes.string.isRequired,
  location: PropTypes.object,
};
