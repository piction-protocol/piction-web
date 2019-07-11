import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import RecommendedProjects from 'pages/HomePage/RecommendedProjects';
import Hero from './Hero';

import Starter from './ic-starter.svg';
import Boosting from './ic-boosting.svg';
import Recommendation from './ic-recommendation.svg';

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-flow: column;
`;

const Section = styled.section`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  align-items: ${props => props.alignItems || 'center'};
  padding: 120px 32px;
`;

const Introduction = styled.p`
  max-width: 620px;
  margin: 32px;
  text-align: center;
  word-break: keep-all;
`;

const SectionTitle = styled.h2`
  font-size: 48px;
  color: var(--primary-color);
  margin-bottom: 32px;
  margin-top: 32px;
  position: relative;
`;

const Circle = styled.div`
  width: 94px;
  height: 94px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid var(--primary-color);
  margin-bottom: 16px;
`;

const Features = styled.div`
  display: flex;
  margin: 48px;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const FeatureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 190px;
  text-align: center;
  margin: 0 10px;
  color: var(--gray--dark);
  font-size: 14px;
  word-break: keep-all;
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

        <Section>
          <SectionTitle>Be the creator!</SectionTitle>
          <Introduction>
            크리에이터의 지속 가능한 창작활동을 픽션이 응원합니다.&nbsp;
            <strong>Piction Pioneership</strong>
            &nbsp;프로그램을 통해 초기에 참여하신 크리에이터에게 창작 지원금을 지원합니다.
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
        </Section>

        <Section>
          <SectionTitle>Recommended Projects</SectionTitle>
          <RecommendedProjects />
        </Section>
      </Main>
    </>
  );
}

export default HomePage;
