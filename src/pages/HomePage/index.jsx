import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components/macro';

import media from 'styles/media';

import Choice from './Choice';
import Official from './Official';
import Category from './Category';
import Trending from './Trending';
import Intro from './Intro';

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

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Piction</title>
      </Helmet>

      <Main>
        <Choice />
        <Official />
        <Category />
        <Trending />
        <Intro />
      </Main>
    </>
  );
}

export default HomePage;
