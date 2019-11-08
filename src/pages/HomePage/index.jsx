import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import media from 'styles/media';

import Banner from 'components/organisms/Banner/FeaturedBanner';

import Choice from './Choice';
import Intro from './Intro';
import Feature from './Feature';
import Next from './Next';

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
function HomePage() {
  return (
    <>
      <Helmet>
        <title>Piction</title>
      </Helmet>

      <Main>
        <Banner />
        <Choice />
        <Intro />

        <Feature />

        <Styled.GrayDiv>
          <Next />
        </Styled.GrayDiv>

      </Main>
    </>
  );
}

export default HomePage;
