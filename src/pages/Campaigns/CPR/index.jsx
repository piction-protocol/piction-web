import React from 'react';
import styled from 'styled-components';
import { importMDX } from 'mdx.macro';

import media, { mediaQuery } from 'styles/media';

import title from './title-mobile.png';
import title2x from './title-mobile@2x.png';
import title3x from './title-mobile@3x.png';
import titleDesktop from './title-desktop.png';

import intro from './intro-mobile.png';
import intro2x from './intro-mobile@2x.png';
import intro3x from './intro-mobile@3x.png';
import introDesktop from './intro-desktop.png';

import steps from './steps-mobile.png';
import steps2x from './steps-mobile@2x.png';
import steps3x from './steps-mobile@3x.png';
import stepsDesktop from './steps-desktop.png';

import { ReactComponent as ParticipateButton } from './btn-participate.svg';

import NoticeComponents from '../NoticeComponents';

const Notice = React.lazy(() => importMDX('./Notice.mdx'));

const Styled = {
  Article: styled.article`
    display: flex;
    flex-flow: column;
    width: 100%;
  `,
  Picture: styled.picture`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    overflow: hidden;
  `,
  Image: styled.img`
    width: 100%;
    height: auto;
    ${media.desktop`
      flex-shrink: 0;
      width: auto;
    `}
  `,
  Link: styled.a.attrs({
    target: '_blank',
  })`
    position: absolute;
    display: flex;
    ${media.mobile`
      bottom: 0;
      width: 80.833%;
      margin-bottom: 83%;
      svg {
        width: 100%;
        height: auto;
      }
    `}
    ${media.desktop`
      bottom: 365px;
    `}
  `,
};

function CPR() {
  return (
    <Styled.Article>
      <Styled.Picture
        style={{
          backgroundImage: 'linear-gradient(to bottom, #cc162f, #ff6076)',
        }}
      >
        <source media={mediaQuery.desktop} srcSet={titleDesktop} />
        <Styled.Image
          src={title}
          srcSet={`
            ${title} 360w,
            ${title2x} 720w,
            ${title3x} 1080w
          `}
          alt="심폐소생전 2019 픽션 창작지원 프로그램"
        />
      </Styled.Picture>
      <Styled.Picture
        style={{
          backgroundColor: '#c5273f',
        }}
      >
        <source media={mediaQuery.desktop} srcSet={introDesktop} />
        <Styled.Image
          src={intro}
          srcSet={`
            ${intro} 360w,
            ${intro2x} 720w,
            ${intro3x} 1080w
          `}
          alt="당신의 서랍 속 작품. 다시 심장 뛰게 하세요."
        />
      </Styled.Picture>
      <Styled.Picture
        style={{
          backgroundColor: '#ffe8eb',
        }}
      >
        <source media={mediaQuery.desktop} srcSet={stepsDesktop} />
        <Styled.Image
          src={steps}
          srcSet={`
            ${steps} 360w,
            ${steps2x} 720w,
            ${steps3x} 1080w
          `}
          alt="작품 올리고, 용돈도 꿀-꺽! 참 쉬운 참여 방법."
        />
        <Styled.Link href="/dashboard/new-project">
          <ParticipateButton />
        </Styled.Link>
      </Styled.Picture>
      <Notice components={NoticeComponents} />
    </Styled.Article>
  );
}

export default CPR;
