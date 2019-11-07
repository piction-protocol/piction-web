import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from '@reach/router';
import styled from 'styled-components';

import media, { mediaQuery } from 'styles/media';
import { MainGrid } from 'styles/Grid';

import useMedia from 'hooks/useMedia';

import Banner from 'components/organisms/Banner/FeaturedBanner';
import { PrimaryButton } from 'components/atoms/Button';

import Intro from './Intro';
import User from './User';
import Feature from './Feature';
import Next from './Next';
import RecommendedProjects from './RecommendedProjects';

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-flow: column;
  max-width: 100%;
  font-size: var(--font-size--small);
  word-break: keep-all;
  ${media.desktop`
    font-size: var(--font-size--base);
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
  GrayDiv: styled.div`
    background-color: var(--gray--light);
  `,
};

const RecommendedSection = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 60px 16px;
  text-align: center;
`;

const DashboardLink = styled(PrimaryButton)`
  margin: 0 auto;
  grid-column: 1 / -1;
  ${media.desktop`
    margin-top: 10px;
  `}
`;

function HomePage() {
  const isDesktop = useMedia(mediaQuery.desktop);

  return (
    <>
      <Helmet>
        <title>Piction</title>
      </Helmet>

      <Main>
        <Banner />
        <Intro />

        <EnglishIntroduction>
          English service is not currently supported.
          <br />
          {' '}
          <Styled.A href="https://about.piction.network/en/">Click here</Styled.A>
          {' '}
          to view the project information.
        </EnglishIntroduction>

        <User />

        <Feature />

        <Styled.GrayDiv>
          <Next />
        </Styled.GrayDiv>

        <RecommendedSection>
          <Styled.H1>추천 프로젝트</Styled.H1>
          <RecommendedProjects />
        </RecommendedSection>

        <Styled.GrayDiv>
          <Section>
            <Styled.H1 style={{ gridColumn: '1 / -1' }}>
              지금 바로 당신의 작품을 등록하고
              <br />
              픽션에서 새로운 경험을 시작하세요!
            </Styled.H1>
            {isDesktop ? (
              <DashboardLink
                as={Link}
                to="/dashboard"
              >
                나의 컨텐츠 등록하기
              </DashboardLink>
            ) : (
              <DashboardLink
                as={Link}
                to="/all"
                size="mini"
              >
                연재중인 프로젝트
              </DashboardLink>
            )}
          </Section>
        </Styled.GrayDiv>
      </Main>
    </>
  );
}

export default HomePage;
