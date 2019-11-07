import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import media from 'styles/media';
import Grid, { MainGrid } from 'styles/Grid';

import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

import IntroImage from 'images/piction-symbol.svg';

const Styled = {
  Section: styled(MainGrid).attrs({
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
  `,
  Image: styled.img`
    max-width: 100%;
    ${media.desktop`
      grid-column: 6 / -1;
      grid-row: 1 / -1;
    `}
  `,
  Contents: styled(Grid).attrs({
    columns: 4,
  })`
    > * {
      grid-column: 1 / -1;
    }
    ${media.desktop`
      --row-gap: 24px;
      grid-column: 2 / 6;
      margin: auto;
      text-align: left;
      white-space: nowrap;
    `}
  `,
  Title: styled.h1`
  font-size: var(--font-size--base);
    ${media.desktop`
      font-size: var(--font-size--large);
    `}
  `,
  Paragraph: styled.p`
    ${media.desktop`
      line-height: var(--line-height--content);
    `}
  `,
  PrimaryButton: styled(PrimaryButton)`
    grid-column: span 2;
    padding-right: 0;
    padding-left: 0;
    ${media.mobile`
      display: none;
    `}
  `,
  SecondaryButton: styled(SecondaryButton)`
    ${media.desktop`
      grid-column: span 2;
    `}
  `,
};

const Intro = () => (
  <Styled.Section>
    <Styled.Image src={IntroImage} />
    <Styled.Contents>
      <Styled.Title>크리에이터와 팬이 만나는 곳, 픽션.</Styled.Title>
      <Styled.Paragraph>
        픽션에서는 누구나 크리에이터가 될 수 있고
        <br />
        누구나 나의 최애 크리에이터를 응원할 수 있습니다.
      </Styled.Paragraph>
      <Styled.PrimaryButton as={Link} to="/dashboard">나의 콘텐츠 등록하기</Styled.PrimaryButton>
      <Styled.SecondaryButton as={Link} to="/all">연재 중인 프로젝트</Styled.SecondaryButton>
    </Styled.Contents>
  </Styled.Section>
);

export default Intro;
