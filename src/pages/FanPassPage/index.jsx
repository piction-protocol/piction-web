import React, {
  useEffect, useContext,
} from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';
import useSWR from 'swr';

import media from 'styles/media';

import { LayoutContext } from 'context/LayoutContext';

import withLoginChecker from 'components/LoginChecker';

import GridTemplate from 'components/templates/GridTemplate';
import FanPass from 'components/molecules/FanPass';
import Thumbnail from 'components/atoms/ContentImage/Thumbnail';
import Heading from 'components/atoms/Heading';
import { PrimaryButton } from 'components/atoms/Button';

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
  const [, setLayout] = useContext(LayoutContext);

  const { data: project } = useSWR(`/projects/${projectId}`, { revalidateOnFocus: false });
  const { data: fanPassList } = useSWR(`/projects/${projectId}/fan-pass`, { revalidateOnFocus: false });
  const {
    data: subscription,
  } = useSWR(() => (`/projects/${projectId}/fan-pass/subscription`));

  useEffect(() => {
    setLayout({
      type: 'project',
      data: { project },
    });

    return (() => {
      setLayout({ type: 'default' });
    });
  }, [project, setLayout]);

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
        {location.state.post && (
          <Styled.Post>
            <Styled.Name>
              {location.state.post.title}
            </Styled.Name>
            <Styled.Notice>
              해당 포스트를 볼 수 있는 FAN PASS 상품만 출력됩니다.
            </Styled.Notice>
          </Styled.Post>
        )}
      </Styled.Header>
      {fanPassList ? fanPassList.map(fanPass => (
        <Styled.FanPass {...fanPass} key={fanPass.id}>
          <PrimaryButton as={Link} to={`purchase/${fanPass.id}`}>
            {`${fanPass.subscriptionPrice} PXL / 30일`}
          </PrimaryButton>
        </Styled.FanPass>
      )) : Array.from({ length: 6 }, (_, i) => (
        <Styled.FanPass isPlaceholder key={i}>
          <PrimaryButton disabled />
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
