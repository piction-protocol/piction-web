import React, { useState } from 'react';
import styled from 'styled-components';

import media, { mediaQuery } from 'styles/media';
import Grid, { MainGrid } from 'styles/Grid';

import useMedia from 'hooks/useMedia';

import CreatorImage from './img-landingpage-creator.png';
import FanImage from './img-landingpage-fan.png';

const Section = styled(Grid).attrs({
  as: 'section',
  columns: 4,
})`
  grid-column: span 3;
  ${media.mobile`
    display: flex;
    flex-flow: column;
    align-items: center;
  `}
  ${media.desktop`
    > * {
      grid-column: 1 / -1;
    }
  `}
`;

const Styled = {
  MainGrid: styled(MainGrid)`
    width: 100%;
    margin: 0 auto;
    position: relative;
    text-align: center;
    ${media.mobile`
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
    &::after{
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      border-bottom: 1px solid #e2e2e2;
      grid-column: 1 / -1;
      ${media.desktop`
        grid-column: 2 / -2;
      `}
    }
  `,
  Creator: styled(Section)`
    ${media.desktop`
      grid-column: 3 / 7
    `}
  `,
  Fan: styled(Section)`
    ${media.desktop`
      grid-column: 7 / -3;
    `}
  `,
  H1: styled.h1`
    font-size: var(--font-size--base);
    text-align: center;
    ${media.mobile`
      margin-top: 12px;
      color: var(--gray--dark);
      ${({ active }) => active && `
        padding-bottom: 2px;
        border-bottom: 2px solid var(--blue);
        color: var(--black);
      `}
    `}
  `,
  P: styled.p`
    text-align: center;
    ${media.mobile`
      width: 100%;
    `}
    ${media.desktop`
      font-size: var(--font-size--small);
    `}
  `,
  Img: styled.img`
    width: 100%;
    margin: 0 auto;
    ${media.mobile`
      max-width: 100px;
    `}
    ${media.desktop`
      grid-column: 2 / span 2;
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
};

const User = () => {
  const [selected, setSelected] = useState('creator');
  const isDesktop = useMedia(mediaQuery.desktop);

  return (
    <Styled.MainGrid>
      <Styled.Creator onClick={() => setSelected('creator')}>
        <Styled.Img src={CreatorImage} />
        <Styled.H1 active={selected === 'creator'}>
          크리에이터
        </Styled.H1>
        {isDesktop && (
          <Styled.P>
            아이디어만 있다면 어떤 콘텐츠라도 가능해요.
            <br />
            픽션에서 나만의 콘텐츠를 연재하세요!
          </Styled.P>
        )}
      </Styled.Creator>
      <Styled.Fan onClick={() => setSelected('fan')}>
        <Styled.Img src={FanImage} />
        <Styled.H1 active={selected === 'fan'}>
          팬
        </Styled.H1>
        {isDesktop && (
          <Styled.P>
            내가 좋아하는 작가를 마음껏 응원해보세요.
            <br />
            응원한 만큼의 보상이 따라올 거예요.
          </Styled.P>
        )}
      </Styled.Fan>
      {!isDesktop && (
        selected === 'creator' ? (
          <Styled.P>
            아이디어만 있다면 어떤 콘텐츠라도 가능해요.
            <br />
            픽션에서 나만의 콘텐츠를 연재하세요!
          </Styled.P>
        ) : (
          <Styled.P>
            내가 좋아하는 작가를 마음껏 응원해보세요.
            <br />
            응원한 만큼의 보상이 따라올 거예요.
          </Styled.P>
        )
      )}
    </Styled.MainGrid>
  );
};

export default User;
