import React from 'react';
import styled from 'styled-components/macro';

import media from 'styles/media';
import { MainGrid } from 'styles/Grid';

import PXLImage from './img-landingpage-pxl.png';
import ExchangeImage from './img-landingpage-exchange.png';
import PiegraphImage from './img-landingpage-piegraph.png';

const Image = styled.img`
  width: 100%;
`;

const Styled = {
  Section: styled(MainGrid).attrs({
    as: 'section',
  })`
    width: 100%;
    margin: 0 auto;
    position: relative;
    text-align: center;
    ${media.mobile`
      --row-gap: 16px;
      padding-top: 60px;
      padding-bottom: 60px;
      > * {
        grid-column: 1 / -1;
      }
    `}
    ${media.desktop`
      align-items: center;
      padding-top: 80px;
      padding-bottom: 80px;
      text-align: left;
    `}
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      border-top: 1px solid #e2e2e2;
      grid-column: 1 / -1;
      ${media.desktop`
        grid-column: 2 / -2;
      `}
    }
    &:first-of-type::before {
      display: none;
    }
  `,
  A: styled.a`
    color: var(--blue);
    text-decoration: underline;
  `,
  H1: styled.h1`
    margin-top: 60px;
    margin-bottom: -44px;
    font-size: 24px;
    color: var(--blue);
    text-align: center;
    ${media.desktop`
      margin-top: 80px;
      margin-bottom: -80px;
      font-size: 40px;
    `}
  `,
  H2: styled.h2`
    margin-top: 40px;
    font-size: var(--font-size--small);
    ${media.desktop`
      font-size: var(--font-size--base);
    `}
  `,
  P: styled.p`
    color: var(--blue);
    font-size: 16px;
    font-weight: normal;
    ${media.desktop`
      padding-left: 24px;
      border-left: 2px solid;
      line-height: var(--line-height--content);
    `}
  `,
  Li: styled.li`
    margin-top: 16px;
    margin-left: 16px;
    text-align: left;
    list-style: square;
    ${media.desktop`
      font-size: var(--font-size--small)
    `}
  `,
  PXLImage: styled(Image).attrs({
    src: PXLImage,
  })`
    ${media.desktop`
      grid-column: 2 / 8;
    `}
  `,
  ExchangeImage: styled(Image).attrs({
    src: ExchangeImage,
  })`
    ${media.desktop`
      grid-column: 6 / -2;
    `}
  `,
  PiegraphImage: styled(Image).attrs({
    src: PiegraphImage,
  })`
    ${media.desktop`
      grid-column: 2 / 7;
    `}
  `,
  RightContents: styled.div`
    ${media.desktop`
      grid-column: span 4 / -2;
      grid-row: 1;
    `}
  `,
  LeftContents: styled.div`
    ${media.desktop`
      grid-column: 2 / span 4;
      grid-row: 1;
    `}
  `,
};

const Feature = () => (

  <article>
    <Styled.H1>“픽션은 무엇이 다른가요?”</Styled.H1>
    <Styled.Section>
      <Styled.PXLImage />
      <Styled.RightContents>
        <Styled.P>
          콘텐츠를 구매하면 바로
          <br />
          크리에이터의 지갑으로 PXL이 담겨요
        </Styled.P>
        <ul>
          <Styled.H2>PXL이란?</Styled.H2>
          <Styled.Li>
            픽션에서 사용되는 가상화폐로 콘텐츠 구매, 후원 혹은 활동에 대한 보상으로 사용돼요.
          </Styled.Li>
        </ul>
        <ul>
          <Styled.H2>어떻게 PXL을 구하나요?</Styled.H2>
          <Styled.Li>
            <Styled.A href="#exchange">
              PXL 거래를 지원하는 거래소
            </Styled.A>
            를 통해 원화로 환전하거나 다른 가상화폐로 교환할 수 있어요.
          </Styled.Li>
          <Styled.Li>PXL을 가지고 있는 다른 사람들에게서 PXL을 선물 받으실 수 있어요.</Styled.Li>
          <Styled.Li>픽션에서 다양한 이벤트와 크리에이터 지원 활동에 참가하시면 PXL을 보상으로 드려요.</Styled.Li>
        </ul>
      </Styled.RightContents>
    </Styled.Section>
    <Styled.Section>
      <Styled.ExchangeImage />
      <Styled.LeftContents>
        <Styled.P>
          매월 정산일을 기다릴 필요 없이
          <br />
          언제든지 현금으로 교환할 수 있어요.
        </Styled.P>
        <ul>
          <Styled.H2>어떻게 PXL을 현금으로 교환하나요?</Styled.H2>
          <Styled.Li>매월 정산일을 기다릴 필요 없이 콘텐츠가 판매되면 그 즉시 크리에이터의 PXL 지갑에 PXL이 입금돼요.</Styled.Li>
          <Styled.Li>
            PXL 지갑에 있는 PXL은 언제든지 PXL 거래를 지원하는 거래소를 통해 원화(KRW) 또는 다른 가상화폐로 교환할 수 있어요.
          </Styled.Li>
        </ul>
        <ul>
          <Styled.H2 id="exchange">PXL 거래를 지원하는 거래소는 어디인가요?</Styled.H2>
          <Styled.Li>
            픽션의 PXL 지갑과 연결된 PXL 거래는 현재 코인원 거래소에서 가능해요.
            {' '}
            <Styled.A href="https://coinone.co.kr/exchange/trade/pxl/krw" target="_blank">
              바로가기
            </Styled.A>
          </Styled.Li>
          <Styled.Li>지원되는 거래소는 점차 확대될 예정이에요.</Styled.Li>
        </ul>
      </Styled.LeftContents>
    </Styled.Section>
    <Styled.Section>
      <Styled.PiegraphImage />
      <Styled.RightContents>
        <Styled.P>
          블록체인 기반의 투명한 정산이 가능해요.
          <br />
          크리에이터에게 돌아가는 수익금 이외에
          <br />
          모든 수수료는 크리에이터와 팬에게 돌아가요.
        </Styled.P>
      </Styled.RightContents>
    </Styled.Section>
  </article>
);

export default Feature;
