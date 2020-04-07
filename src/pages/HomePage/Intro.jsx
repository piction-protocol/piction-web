import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import media from 'styles/media';
import { MainGrid } from 'styles/Grid';

import { TertiaryButton } from 'components/atoms/Button';

import { ReactComponent as PictionSymbol } from 'images/piction-symbol--white.svg';
import Background from './bg-intro.png';

const Styled = {
  Section: styled.section`
    position: relative;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    color: var(--white);
    text-align: center;
    background-image: linear-gradient(to bottom, var(--blue), #a3e0ff 100%);
    ${media.mobile`
      padding-top: 100px;
      padding-bottom: 100px;
    `}
    ${media.desktop`
      padding-top: 160px;
      padding-bottom: 160px;
    `}
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      border-top: 32px solid var(--white);
      border-left: 100vw solid transparent;
      ${media.desktop`
        border-top-width: 90px;
      `}
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 234px;
      background-size: auto 100%;
      background-position: center bottom;
      background-image: url(${Background});
      ${media.desktop`
        height: 342px;
      `}
    }
  `,
  MainGrid: styled(MainGrid)`
    position: relative;
    z-index: 1;
  `,
  Image: styled(PictionSymbol)`
    grid-column: 1 / -1;
    width: 64px;
    margin: 0 auto;
    ${media.desktop`
      width: 72px;
    `}
  `,
  Title: styled.h1`
    grid-column: 1 / -1;
    font-size: 24px;
    ${media.desktop`
      font-size: 40px;
      &::after {
        content: '';
        display: block;
        width: 32px;
        margin: 24px auto 0;
        border-top: 1px solid var(--white);
      }
    `}
  `,
  Paragraph: styled.p`
    grid-column: 1 / -1;
    ${media.desktop`
      font-size: var(--font-size--small);
    `}
  `,
  Button: styled(TertiaryButton)`
    grid-column: 2 / -2;
    ${media.desktop`
      grid-column: 6 / -6;
    `}
  `,
};

const Intro = () => (
  <Styled.Section>
    <Styled.MainGrid>
      <Styled.Image />
      <Styled.Title>
        크리에이터와
        <br />
        팬이 만나는 곳, 픽션.
      </Styled.Title>
      <Styled.Paragraph>
        픽션에서는 누구나 크리에이터가 될 수 있고
        <br />
        누구나 나의 최애 크리에이터를 응원할 수 있습니다.
      </Styled.Paragraph>
      <Styled.Button as={Link} to="/all">연재 중인 프로젝트</Styled.Button>
    </Styled.MainGrid>
  </Styled.Section>
);

export default Intro;
