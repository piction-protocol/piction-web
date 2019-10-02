import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import media, { mediaQuery } from 'styles/media';
import Grid, { MainGrid } from 'styles/Grid';

import useMedia from 'hooks/useMedia';

import DNFBanner from 'components/organisms/Banner/DNFBanner';
import { PrimaryButton } from 'components/atoms/Button';

import { ReactComponent as CircleSymbol } from 'images/img-circlesymbol.svg';
import { ReactComponent as PieGraphImage } from 'images/img-piegraph.svg';
import { ReactComponent as TimerImage } from 'images/img-timer.svg';
import { ReactComponent as StepImage } from 'images/img-step.svg';
import { ReactComponent as LoopImage } from 'images/img-loop.svg';
import { ReactComponent as CommunityImage } from 'images/img-community.svg';

import IntroBackground from './bg-intro.png';
import OutroBackground from './bg-outro.png';

const Styled = {
  Main: styled.main.attrs({
    role: 'main',
  })`
    --gradient: linear-gradient(to bottom, var(--blue), #a3e0ff);
    display: flex;
    flex: 1;
    flex-flow: column;
  `,
  Intro: styled.section`
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 60px 0 80px;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center bottom;
    background-image: url(${IntroBackground}), var(--gradient);
    text-align: center;
    ${media.desktop`
      padding: 120px 0 160px;
    `}
    svg {
      width: 60px;
      height: 60px;
      margin-bottom: 16px;
      ${media.desktop`
        margin-bottom: 24px;
      `}
    }
  `,
  Title: styled.h1`
    color: var(--white);
    font-weight: bold;
    ${media.desktop`
      font-size: var(--font-size--large);
    `}
  `,
  IntroText: styled.p`
    margin-top: 16px;
    color: var(--white);
    font-size: var(--font-size--small);
    ${media.desktop`
      margin-top: 24px;
      font-size: var(--font-size--base);
    `}
  `,
  MainGrid: styled(MainGrid)`
    ${media.mobile`
      --row-gap: 0;
      padding: 20px 32px;
    `}
    ${media.desktop`
      --row-gap: 120px;
      padding-top: 120px;
      padding-bottom: 120px;
    `}
  `,
  Section: styled(Grid).attrs({
    as: 'section',
    columns: 5,
  })`
    --row-gap: 24px;
    color: #333333;
    font-size: var(--font-size--small);
    ${media.mobile`
      grid-column: 1 / -1;
      padding: 16px 0 40px;
      &:not(:last-child) {
        border-bottom: 1px solid var(--gray--light);
      }
      svg {
        width: 48px;
        height: 48px;
        margin: 0 auto;
      }
      > * {
        grid-column: 1 / -1;
      }
    `}
    ${media.desktop`
      grid-auto-rows: min-content;
      &:nth-child(odd) {
        grid-column: 2 / span 5;
      }
      &:nth-child(even) {
        grid-column: span 5 / -2;
      }
      > * {
        grid-column: 2 / -1;
      }
      > svg {
        grid-column: 1;
        margin-left: auto;
      }
      p {
        padding-right: 36px;
      }
    `}
  `,
  SectionTitle: styled.h2`
    ${media.mobile`
      font-size: var(--font-size--base);
      text-align: center;
    `}
    ${media.desktop`
      font-size: 20px;
    `}
  `,
  Quote: styled.blockquote`
    margin: 0;
    color: var(--blue);
    ${media.mobile`
      font-size: 16px;
      text-align: center;
    `}
    ${media.desktop`
      font-size: var(--font-size--base);
    `}
  `,
  Note: styled.p`
    color: var(--gray--dark);
  `,
  Outro: styled.section`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: 2px;
    padding: 60px 0;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center bottom;
    background-image: url(${OutroBackground}), var(--gradient);
    text-align: center;
    ${media.desktop`
      padding: 80px 0;
    `}
  `,
  Link: styled(PrimaryButton).attrs({
    as: Link,
  })`
    margin-top: 24px;
    ${media.desktop`
      margin-top: 40px;
    `}
  `,
};

function CreatorsGuide() {
  const isDesktop = useMedia(mediaQuery.desktop);

  return (
    <Styled.Main>
      <Styled.Intro>
        <CircleSymbol />
        <Styled.Title>
          이런 크리에이터라면
          <br />
          지금, 픽션하세요.
        </Styled.Title>
        <Styled.IntroText>
          픽션에서는 누구나 크리에이터가 될 수 있고,
          <br />
          누구나 나의 최애 크리에이터를 응원할 수 있습니다.
        </Styled.IntroText>
      </Styled.Intro>
      <Styled.MainGrid>
        <Styled.Section>
          <PieGraphImage />
          <Styled.SectionTitle>
            기존 플랫폼의 높은 수수료가
            <br />
            부당하다고 생각하신 크리에이터님.
          </Styled.SectionTitle>
          <Styled.Quote>
            “분명 10,000원을 벌었는데,
            <br />
            정산은 겨우 6,000원이라니?*”
          </Styled.Quote>
          <p>
            픽션은 8%의 기본 수수료에, 12%의 생태계 조성 수수료*를 책정하고 있습니다.
          </p>
          <Styled.Note>
            * 통상적으로 구글, 애플 앱 수수료 30%, 플랫폼 수수료 10%, 결제 수수료 4~15%
          </Styled.Note>
          <Styled.Note>
            * 생태계 조성 수수료란, 픽션의 크리에이터와 이용자에게 환원되는 금액입니다.
            크리에이터를 위한 정기적인 활동 및 프로그램 지원, 금액 지원을 통한 콘텐츠 구매 촉진,
            생태계 활성화에 기여한 유저 보상에 이용됩니다.
          </Styled.Note>
        </Styled.Section>

        <Styled.Section>
          <TimerImage />
          <Styled.SectionTitle>
            플랫폼 정산이 오래 걸리고,
            <br />
            복잡한 점에 불만이신 크리에이터님.
          </Styled.SectionTitle>
          <Styled.Quote>
            “익월? 익익월?
            <br />
            언제까지 기다려야 입금이 되는거지?”
          </Styled.Quote>
          <p>
            픽션에서는 매월 정산일을 기다리실 필요가 없습니다.
            수익이 발생하는 즉시 크리에이터의 지갑으로 입금되며, 즉각적인 출금이 가능합니다.
            모든 절차는 투명하게 공개되며, 정산에 픽션은 관여하지 않습니다.
          </p>
        </Styled.Section>

        <Styled.Section>
          <StepImage />
          <Styled.SectionTitle>
            2차 창작의 수익화로, 지속적인 창작을
            <br />
            원하시는 크리에이터님.
          </Styled.SectionTitle>
          <Styled.Quote>
            “덕질은 돈을 벌 수 없을까?
            <br />
            내가 만든 콘텐츠도 돈이 될 수 있을까?”
          </Styled.Quote>
          <p>
            픽션은 크리에이터의 콘텐츠를 좋아하는 팬들의 후원 및 구독을 통해 수익이 발생하며,
            이에 따라 어떠한 콘텐츠도 제작하실 수 있습니다.
            예를 들어, 애니 및 게임 팬아트, 아이돌 팬아트, 유명 IP의 코스프레, 커버 음원 등 자유로운 활동이 가능합니다.
          </p>
          <Styled.Note>
            구독료 설정은 크리에이터가 자유롭게 설정 가능합니다.
            이 서비스는 FAN PASS라는 멤버십을 통해 이루어지며, 멤버십 가격은 크리에이터가 자유롭게 설정할 수 있습니다.
          </Styled.Note>
        </Styled.Section>

        <Styled.Section>
          <LoopImage />
          <Styled.SectionTitle>
            작품 투고 뺑뺑이,
            <br />
            도전이 지긋지긋하신 크리에이터님.
          </Styled.SectionTitle>
          <Styled.Quote>
            “댓글과 좋아요 수는 올라가지만,
            <br />
            몇 년째 작가 도전 란에 틀어박힌 내 작품.”
          </Styled.Quote>
          <p>
            기약 없는 도전 만화, 자유 연재, 대답 없는 작품 투고가 지겹다면 픽션해보세요.
            누구나 자신의 팬을 모으고 후원을 받을 수 있습니다.
            또한 픽션의 점차적인 크리에이터 지원 시스템으로 작품 활동을 이어갈 수도 있습니다.
          </p>
          <Styled.Note>
            * 11월 중 픽션 파이오니어십(창작 지원) 프로그램 오픈 예정
          </Styled.Note>
          <Styled.Note>
            * 12월 중 펀딩을 통한 작품 제작비 마련 프로그램 오픈 예정
          </Styled.Note>
          <Styled.Note>
            * 12월 중 콘텐츠 공모전인 픽션 챌린지 오픈 등, 창작자 지원 시스템 예정
          </Styled.Note>
        </Styled.Section>

        <Styled.Section>
          <CommunityImage />
          <Styled.SectionTitle>
            악플이 두려워 작품 활동을
            <br />
            망설이시는 크리에이터님.
          </Styled.SectionTitle>
          <Styled.Quote>
            “남몰래 서랍 속에 묻어 두었던 작품,
            <br />
            노트에 홀로 끄적이던 습작.”
          </Styled.Quote>
          <p>
            용기를 내어 연재를 해보고 싶은데 불특정다수의 차가운 평가가 두려워서 망설였다면, 픽션해보세요.
            크리에이터의 콘텐츠를 구독하는 이용자에게만 공개할 수도 있으며, 구독자 한정으로 응원 댓글을 남길 수 있는 등,
            크리에이터님의 콘텐츠를 좋아하는 팬과 소통할 수 있습니다.
          </p>
        </Styled.Section>
      </Styled.MainGrid>
      <Styled.Outro>
        <Styled.Title>
          처음 만나는 크리에이터의 생태계.
          <br />
          이제, 픽션에서 체험해보세요.
        </Styled.Title>
        {isDesktop ? (
          <Styled.Link to="/dashboard">
            지금 바로 시작하기
          </Styled.Link>
        ) : (
          <Styled.Link to="/all" size="mini">
            연재 중인 프로젝트
          </Styled.Link>
        )}
      </Styled.Outro>
      <DNFBanner />
    </Styled.Main>
  );
}

export default CreatorsGuide;
