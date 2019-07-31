import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import media from 'styles/media';
import Grid, { MainGrid } from 'styles/Grid';

import RecommendedProjects from './RecommendedProjects';
import Hero from './Hero';

import Starter from './ic-starter.svg';
import Boosting from './ic-boosting.svg';
import Recommendation from './ic-recommendation.svg';
import LiquidBackgroundImage from './img-liquid-01.png';
import PaintBackgroundImage1 from './img-paint-01.png';
import PaintBackgroundImage2 from './img-paint-02.png';

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-flow: column;
  font-size: 12px;
  ${media.desktop`
    font-size: 18px;
  `}
`;

const Cautions = styled.div`
  padding: 16px 32px;
  background-color: var(--gray--light);
  color: var(--gray--dark);
  text-align: center;
  ${media.desktop`
    font-size: 14px;
    padding: 24px;
  `}
`;

const Section = styled.section`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 48px 16px;
  ${media.desktop`
    padding: 120px 0;
  `}
`;

const SectionTitle = styled.h2`
  grid-column: 1 / -1;
  margin-bottom: 24px;
  color: var(--primary-color);
  font-size: 32px;
  text-align: center;
  ${media.desktop`
    margin-bottom: 48px;
    font-size: 48px;
  `}
`;

const Introduction = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  word-break: keep-all;
  ${media.desktop`
    grid-column: 4 / -4;
    margin-bottom: 24px;
  `}
`;

const FeaturesSection = styled(Section)`
  background-image: url(${LiquidBackgroundImage}), url(${LiquidBackgroundImage});
  background-size: 288px;
  background-repeat: no-repeat;
  background-position: -144px -46px, calc(100% + 192px) 192px;
  ${media.desktop`
    padding: 64px 0;
    background-size: 400px;
    background-position: -69px -68px, calc(100% + 57px) -203px;
  `}
`;

const Features = styled(Grid).attrs({
  columns: 6,
})`
  grid-column: 1 / -1;
  row-gap: 48px;
  ${media.desktop`
    grid-column: 4 / -4;
  `}
`;

const FeatureWrapper = styled.div`
  grid-column: 2 / -2;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: var(--gray--dark);
  font-size: 14px;
  text-align: center;
  word-break: keep-all;
  ${media.desktop`
    grid-column: span 2;
  `}
`;

const RecommendedSection = styled(Section)`
  background-image: url(${PaintBackgroundImage1}), url(${PaintBackgroundImage2});
  background-size: auto 274px, auto 378px;
  background-repeat: no-repeat;
  background-position: -176px 0, calc(100% + 151px) calc(100% - 166px);
  ${media.desktop`
    padding: 64px 0;
    background-image: url(${LiquidBackgroundImage});
    background-size: 600px;
    background-position: calc(100% + 97px) 32px;
  `}
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 94px;
  height: 94px;
  margin-bottom: 16px;
  border: 3px solid var(--primary-color);
  border-radius: 50%;
`;

const IconImg = styled.img`
  width: 48px;
  height: 48px;
`;

const Feature = ({ icon, children }) => (
  <FeatureWrapper>
    <Circle>
      <IconImg src={icon} />
    </Circle>
    {children}
  </FeatureWrapper>
);

Feature.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Piction</title>
      </Helmet>

      <Main>
        <Hero />
        <Cautions>
          [안내] 픽션 서비스 안정화 기간동안 PXL 토큰 사용이 제한됩니다.
        </Cautions>
        <FeaturesSection>
          <SectionTitle>Be the creator!</SectionTitle>
          <MainGrid>
            <Introduction>
              크리에이터의 지속 가능한 창작활동을 픽션이 응원합니다.
              {' '}
              <strong>Piction Pioneership</strong>
              {' '}
              프로그램을 통해 초기에 참여하신 크리에이터에게 창작 지원금을 지원합니다.
            </Introduction>

            <Features>
              <Feature icon={Starter}>
                <p>
                  안정적인 창작활동을 위해&nbsp;
                  <span style={{ color: 'var(--primary-color)' }}>초기지원금</span>
                  을 지원합니다
                </p>
              </Feature>
              <Feature icon={Boosting}>
                <p>
                  꾸준히 창작 활동을 하시는 크리에이터에게&nbsp;
                  <span style={{ color: 'var(--primary-color)' }}>추가지원금</span>
                  을 지원합니다
                </p>
              </Feature>
              <Feature icon={Recommendation}>
                다양한 콘텐츠 지원 프로그램에서 지원혜택을 받을 수 있습니다.
              </Feature>
            </Features>
          </MainGrid>
        </FeaturesSection>

        <RecommendedSection>
          <SectionTitle>Recommended Projects</SectionTitle>
          <RecommendedProjects />
        </RecommendedSection>
      </Main>
    </>
  );
}

export default HomePage;
