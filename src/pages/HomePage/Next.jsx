import React from 'react';
import styled from 'styled-components';

import media from 'styles/media';
import Grid, { MainGrid } from 'styles/Grid';

import FanpassImage from './img-landingpage-fanpass.png';
import NextImage from './img-landingpage-next.png';

const Section = styled(Grid).attrs({
  columns: 4,
  as: 'section',
})`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  > * {
    grid-column: 1 / -1;
  }
  ${media.desktop`
    padding: 0 48px;
  `}
`;

const Styled = {
  MainGrid: styled(MainGrid)`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    ${media.mobile`
      --row-gap: 16px;
      --outer-gap: 32px;
      padding-top: 60px;
      padding-bottom: 60px;
      > * {
        grid-column: 1 / -1;
      }
    `}
    ${media.desktop`
      align-items: flex-start;
      padding-top: 80px;
      padding-bottom: 80px;
      text-align: left;
    `}
  `,
  FanPassSection: styled(Section)`
    ${media.desktop`
      grid-column: 3 / 7
    `}
  `,
  NextSection: styled(Section)`
    ${media.desktop`
      grid-column: 7 / -3;
    `}
  `,
  H1: styled.h1`
    font-size: var(--font-size--base);
    text-align: center;
  `,
  P: styled.p`
    color: var(--gray--dark);
    ${media.desktop`
      font-size: var(--font-size--small);
    `}
  `,
  Img: styled.img`
    width: 100%;
    max-width: 195px;
    margin: 0 auto;
    ${media.desktop`
      grid-column: 2 / span 2;
      margin: 12px auto;
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
  Hr: styled.hr`
    width: 100%;
    margin: 44px 0;
    border: 1px solid #e2e2e2;
    ${media.desktop`
      display: none;
    `}
  `,
};

const Next = () => (
  <Styled.MainGrid>
    <Styled.FanPassSection>
      <Styled.H1>
        크리에이터가 수익을 내는 방법!
        <br />
        FAN PASS
      </Styled.H1>
      <Styled.P>
        FAN PASS는 크리에이터의 창작 활동을 후원하는
        <br />
        구독형 콘텐츠 판매 멤버십이에요.
      </Styled.P>
      <Styled.Img src={FanpassImage} />
      <ul>
        <Styled.Li>크리에이터가 직접 FAN PASS의 가격과 구성을 자유롭게 설계할 수 있어요.</Styled.Li>
        <Styled.Li>FAN PASS의 등급에 따라 콘텐츠의 공개 단계를 다르게 설정할 수 있어요.</Styled.Li>
        <Styled.Li>FAN PASS가 판매되면 즉시 판매 금액이 크리에이터의 PXL 지갑에 입금돼요.</Styled.Li>
      </ul>
    </Styled.FanPassSection>
    <Styled.Hr />
    <Styled.NextSection>
      <Styled.H1>
        NEXT! 앞으로 이런 기능들이
        <br />
        추가될 거에요.
      </Styled.H1>
      <Styled.P>
        유용한 기능들을 지원하기 위해
        <br />
        픽션팀이 열심히 노력하고 있어요.
      </Styled.P>
      <Styled.Img src={NextImage} />
      <ul>
        <Styled.Li>가상화폐 거래소 이외에 다양한 결제수단을 통해 콘텐츠를 구매할 수 있도록 준비 중이에요.</Styled.Li>
        <Styled.Li>팬들에 의한 콘텐츠 제작비 조달이 가능해질 거에요.</Styled.Li>
        <Styled.Li>크리에이터의 창작활동을 도울 수 있는 다양한 기능을 준비 중이에요.</Styled.Li>
        <Styled.Li>크리에이터 창작을 지원하는 여러가지 프로그램과 공모전이 운영될 예정이에요.</Styled.Li>
      </ul>
    </Styled.NextSection>
  </Styled.MainGrid>
);

export default Next;
