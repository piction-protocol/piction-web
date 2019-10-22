import React from 'react';
import styled from 'styled-components';

import useMedia from 'hooks/useMedia';

import media, { mediaQuery } from 'styles/media';

import title from './title-mobile.png';
import title2x from './title-mobile@2x.png';
import title3x from './title-mobile@3x.png';
import titleDesktop from './title-desktop.png';

import intro from './intro-mobile.png';
import intro2x from './intro-mobile@2x.png';
import intro3x from './intro-mobile@3x.png';
import introDesktop from './intro-desktop.png';

import step from './step-mobile.png';
import step2x from './step-mobile@2x.png';
import step3x from './step-mobile@3x.png';
import stepDesktop from './step-desktop.png';

const Styled = {
  Article: styled.article`
    display: flex;
    position: relative;
    flex-flow: column;
    width: 100%;
  `,
  Image: styled.img`
    width: 100%;
    height: auto;
    ${media.desktop`
      width: auto;
    `}
  `,
  Section: styled.section`
    display: flex;
    justify-content: center;
    overflow: hidden;
  `,
};

function CPR() {
  const isMobile = useMedia(mediaQuery.mobile);

  return isMobile ? (
    <Styled.Article>
      <Styled.Image
        src={title}
        srcSet={`
          ${title} 360w,
          ${title2x} 720w,
          ${title3x} 1080w
        `}
        alt="심폐소생전 2019 픽션 창작지원 프로그램"
      />
      <Styled.Image
        src={intro}
        srcSet={`
          ${intro} 360w,
          ${intro2x} 720w,
          ${intro3x} 1080w
        `}
        alt="당신의 서랍 속 작품. 다시 심장 뛰게 하세요."
      />
      <Styled.Image
        src={step}
        srcSet={`
          ${step} 360w,
          ${step2x} 720w,
          ${step3x} 1080w
        `}
        alt="작품 올리고, 용돈도 꿀-꺽! 참 쉬운 참여 방법."
      />
    </Styled.Article>
  ) : (
    <Styled.Article>
      <Styled.Section
        style={{
          backgroundImage: 'linear-gradient(to bottom, #cc162f, #ff6076)',
        }}
      >
        <Styled.Image
          src={titleDesktop}
          alt="심폐소생전 2019 픽션 창작지원 프로그램"
        />
      </Styled.Section>
      <Styled.Section
        style={{
          backgroundColor: '#c5273f',
        }}
      >
        <Styled.Image
          src={introDesktop}
          alt="당신의 서랍 속 작품. 다시 심장 뛰게 하세요."
        />
      </Styled.Section>
      <Styled.Section
        style={{
          backgroundColor: '#ffe8eb',
        }}
      >
        <Styled.Image
          src={stepDesktop}
          alt="작품 올리고, 용돈도 꿀-꺽! 참 쉬운 참여 방법."
        />
      </Styled.Section>
    </Styled.Article>
  );
}

export default CPR;
