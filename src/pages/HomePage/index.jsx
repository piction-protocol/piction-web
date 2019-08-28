import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from '@reach/router';
import styled from 'styled-components';

import media from 'styles/media';
import { MainGrid } from 'styles/Grid';

import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

import RecommendedProjects from './RecommendedProjects';

import IntroImage from './img-landingpage-intro.png';
import PXLImage from './img-landingpage-pxl.png';
import ExchangeImage from './img-landingpage-exchange.png';
import PiegraphImage from './img-landingpage-piegraph.png';

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-flow: column;
  max-width: var(--max-width);
  margin: 0 auto;
  font-size: 12px;
  ${media.desktop`
    font-size: 18px;
  `}
`;

const Section = styled(MainGrid).attrs({
  as: 'section',
})`
  --row-gap: 16px;
  width: 100%;
  margin: 0 auto;
  padding: 60px 32px;
  text-align: center;
  > * {
    grid-column: 1 / -1;
  }
  ${media.desktop`
    padding: 120px 16px;
  `}
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size--base);
  ${media.desktop`
    font-size: var(--font-size--large);
  `}
`;

const Image = styled.img`
  width: 100%;
`;

const Article = styled.article`
`;

const ArticleTitle = styled.h3`
  color: var(--blue);
  font-weight: normal;
`;

const EnglishIntroduction = styled.div`
  padding: 24px;
  background-color: var(--gray--light);
  color: var(--gray--dark);
  text-align: center;
  a {
    color: var(--blue);
  }
  ${media.desktop`
    font-size: 14px;
    br {
      display: none;
    }
  `}
`;

const RecommendedSection = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 60px 16px;
  text-align: center;
`;

const liStyle = {
  listStyle: 'square',
  textAlign: 'left',
};

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Piction</title>
      </Helmet>

      <Main>
        <Section>
          <Image src={IntroImage} />
          <SectionTitle>크리에이터와 팬이 만나는 곳, 픽션.</SectionTitle>
          <p>
            픽션에서는 누구나 크리에이터가 될 수 있고
            <br />
            누구나 나의 최애 크리에이터를 응원할 수 있습니다.
          </p>
          <PrimaryButton as={Link} to="/dashboard">나의 콘텐츠 등록하기</PrimaryButton>
          <SecondaryButton as={Link} to="/all">연재 중인 프로젝트</SecondaryButton>
        </Section>
        <EnglishIntroduction>
          English service is not currently supported.
          <br />
          {' '}
          <a href="https://about.piction.network/en/">Click here</a>
          {' '}
          to view the project information.
        </EnglishIntroduction>

        <Section>
          <ul>
            <li style={liStyle}>
              <h2>크리에이터</h2>
              <p>아이디어만 있다면 어떤 콘텐츠라도 가능해요. 픽션에서 나만의 콘텐츠를 연재하세요!</p>
            </li>
            <li style={liStyle}>
              <h2>팬</h2>
              <p>내가 좋아하는 작가를 마음껏 응원해보세요. 응원한 만큼의 보상이 따라올 거예요.</p>
            </li>
          </ul>
        </Section>

        <Section>
          <SectionTitle>픽션은 무엇이 다른가요?</SectionTitle>
          <Article>
            <Image src={PXLImage} />
            <ArticleTitle>
              콘텐츠를 구매하면 바로
              <br />
              크리에이터의 지갑으로 PXL이 담겨요
            </ArticleTitle>
            <ul>
              <h4>PXL이란?</h4>
              <li style={liStyle}>
                픽션에서 사용되는 가상화폐로 콘텐츠 구매, 후원 혹은 활동에 대한 보상으로 사용돼요.
              </li>
            </ul>
            <ul>
              <li style={liStyle}>
                <h4>어떻게 PXL을 구하나요?</h4>
                <p>픽션에서 사용되는 가상화폐로 PXL 거래를 지원하는 거래소를 통해 원화로 환전하거나 다른 가상화폐로 교환할 수 있어요.</p>
                <p>PXL을 가지고 있는 다른 사람들에게서 PXL을 선물 받으실 수 있어요.</p>
                <p>픽션에서 다양한 이벤트와 크리에이터 지원 활동에 참가하시면 PXL을 보상으로 드려요.</p>
              </li>
            </ul>
          </Article>
          <Article>
            <Image src={ExchangeImage} />
            <ArticleTitle>
              매월 정산일을 기다릴 필요 없이
              <br />
              언제든지 현금으로 교환할 수 있어요.
            </ArticleTitle>
            <ul>
              <li style={liStyle}>
                <h4>어떻게 PXL을 현금으로 교환하나요?</h4>
                <p>매월 정산일을 기다릴 필요 없이 콘텐츠가 판매되면 그 즉시 크리에이터의 PXL 지갑에 PXL이 입금돼요.</p>
                <p>PXL 지갑에 있는 PXL은 언제든지 PXL 거래를 1 지원하는 거래소를 통해 원화(KRW) 또는 다른 가상화폐로 교환할 수 있어요.</p>
              </li>
              <li style={liStyle}>
                <h4>PXL 거래를 지원하는 거래소는 어디인가요?</h4>
                <p>픽션의 PXL 지갑과 연결된 PXL 거래는 현재 코인원 거래소에서 가능해요. 바로가기</p>
                <p>지원되는 거래소는 점차 확대될 예정이에요.</p>
              </li>
            </ul>
          </Article>
          <Article>
            <Image src={PiegraphImage} />
            <ArticleTitle>
              블록체인 기반의 투명한 정산이 가능해요.
              <br />
              크리에이터에게 돌아가는 수익금 이외에
              <br />
              모든 수수료는 크리에이터와 팬에게 돌아가요.
            </ArticleTitle>
          </Article>
        </Section>

        <Section style={{ backgroundColor: 'var(--gray--light)' }}>
          <SectionTitle>크리에이터가 수익을 내는 방법! FAN PASS</SectionTitle>
          <p>FAN PASS는 크리에이터의 창작 활동을 후원하는 구독형 콘텐츠 판매 멤버십이에요</p>
          <ul>
            <li style={liStyle}>크리에이터가 직접 FAN PASS의 가격과 구성을 자유롭게 설계할 수 있어요.</li>
            <li style={liStyle}>FAN PASS의 등급에 따라 콘텐츠의 공개 단계를 다르게 설정할 수 있어요.</li>
            <li style={liStyle}>FAN PASS가 판매되면 즉시 판매 금액이 크리에이터의 PXL 지갑에 입금되요</li>
          </ul>
        </Section>

        <Section style={{ backgroundColor: 'var(--gray--light)' }}>
          <SectionTitle>Next! 앞으로 이런 기능들이 추가될 거에요.</SectionTitle>
          <p>유용한 기능들을 지원하기 위해 픽션팀이 열심히 노력하고 있어요</p>
          <ul>
            <li style={liStyle}>가상화폐 거래소 이외에 다양한 결제수단을 통해 콘텐츠를 구매할 수 있도록 준비 중이에요.</li>
            <li style={liStyle}>팬들에 의한 콘텐츠 제작비 조달이 가능해질 거에요.</li>
            <li style={liStyle}>크리에이터의 창작활동을 도울 수 있는 다양한 기능을 준비 중이에요.</li>
            <li style={liStyle}>크리에이터 창작을 지원하는 여러가지 프로그램과 공모전이 운영될 예정이에요.</li>
          </ul>
        </Section>

        <RecommendedSection>
          <SectionTitle>추천 프로젝트</SectionTitle>
          <RecommendedProjects />
        </RecommendedSection>

        <Section style={{ backgroundColor: 'var(--gray--light)' }}>
          <SectionTitle>
            지금 바로 당신의 작품을 등록하고
            <br />
            픽션에서 새로운 경험을 시작하세요!
          </SectionTitle>
          <PrimaryButton as={Link} to="/dashboard" size="mini" style={{ margin: 'auto' }}>
            나의 컨텐츠 등록하기
          </PrimaryButton>
        </Section>
      </Main>
    </>
  );
}

export default HomePage;
