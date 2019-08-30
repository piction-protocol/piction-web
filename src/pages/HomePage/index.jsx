import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from '@reach/router';
import styled from 'styled-components';

import media from 'styles/media';
import { MainGrid } from 'styles/Grid';

import { PrimaryButton } from 'components/atoms/Button';

import Intro from './Intro';
import Feature from './Feature';
import RecommendedProjects from './RecommendedProjects';


const Main = styled.main`
  display: flex;
  flex: 1;
  flex-flow: column;
  font-size: 12px;
  ${media.desktop`
    font-size: 18px;
  `}
`;

const Section = styled(MainGrid).attrs({
  as: 'section',
})`
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
    padding-top: 80px;
    padding-bottom: 80px;
  `}
`;

const EnglishIntroduction = styled.small`
  padding: 24px;
  background-color: var(--gray--light);
  color: var(--gray--dark);
  font-size: var(--font-size--tiny);
  text-align: center;
  ${media.desktop`
    font-size: var(--font-size--small);
    br {
      display: none;
    }
  `}
`;


const Styled = {
  A: styled.a`
    color: var(--blue);
    text-decoration: underline;
  `,
  H1: styled.h1`
    font-size: var(--font-size--base);
    ${media.desktop`
      font-size: var(--font-size--large);
    `}
  `,
};

const RecommendedSection = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 60px 16px;
  text-align: center;
`;

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Piction</title>
      </Helmet>

      <Main>
        <Section>
          <Intro />
        </Section>

        <EnglishIntroduction>
          English service is not currently supported.
          <br />
          {' '}
          <Styled.A href="https://about.piction.network/en/">Click here</Styled.A>
          {' '}
          to view the project information.
        </EnglishIntroduction>

        <Feature />

        <div style={{ backgroundColor: 'var(--gray--light)' }}>
          <Section>
            <Styled.H1>
              크리에이터가 수익을 내는 방법!
              <br />
              FAN PASS
            </Styled.H1>
            <p>FAN PASS는 크리에이터의 창작 활동을 후원하는 구독형 콘텐츠 판매 멤버십이에요</p>
            <li>
              <li>크리에이터가 직접 FAN PASS의 가격과 구성을 자유롭게 설계할 수 있어요.</li>
              <li>FAN PASS의 등급에 따라 콘텐츠의 공개 단계를 다르게 설정할 수 있어요.</li>
              <li>FAN PASS가 판매되면 즉시 판매 금액이 크리에이터의 PXL 지갑에 입금되요</li>
            </li>
          </Section>

          <Section>
            <Styled.H1>
              NEXT! 앞으로 이런 기능들이
              <br />
              추가될 거에요.
            </Styled.H1>
            <p>유용한 기능들을 지원하기 위해 픽션팀이 열심히 노력하고 있어요</p>
            <li>
              <li>가상화폐 거래소 이외에 다양한 결제수단을 통해 콘텐츠를 구매할 수 있도록 준비 중이에요.</li>
              <li>팬들에 의한 콘텐츠 제작비 조달이 가능해질 거에요.</li>
              <li>크리에이터의 창작활동을 도울 수 있는 다양한 기능을 준비 중이에요.</li>
              <li>크리에이터 창작을 지원하는 여러가지 프로그램과 공모전이 운영될 예정이에요.</li>
            </li>
          </Section>
        </div>

        <RecommendedSection>
          <Styled.H1>추천 프로젝트</Styled.H1>
          <RecommendedProjects />
        </RecommendedSection>

        <Section style={{ backgroundColor: 'var(--gray--light)' }}>
          <Styled.H1>
            지금 바로 당신의 작품을 등록하고
            <br />
            픽션에서 새로운 경험을 시작하세요!
          </Styled.H1>
          <PrimaryButton as={Link} to="/dashboard" size="mini" style={{ margin: 'auto' }}>
            나의 컨텐츠 등록하기
          </PrimaryButton>
        </Section>
      </Main>
    </>
  );
}

export default HomePage;
