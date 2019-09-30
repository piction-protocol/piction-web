import React from 'react';
import styled from 'styled-components';

import titleImage from './title-mobile.png';
import titleImage2 from './title-mobile@2x.png';
import titleImage3 from './title-mobile@3x.png';

import introImage from './intro-mobile.png';
import introImage2 from './intro-mobile@2x.png';
import introImage3 from './intro-mobile@3x.png';

const Styled = {
  TitleImage: styled.img`
    position: absolute;
    top: 0;
    width: 100%;
  `,
  IntroImage: styled.img`
    padding-top: 64%;
  `,
};

const Intro = () => (
  <>
    <Styled.TitleImage
      src={titleImage}
      srcSet={`
        ${titleImage} 360w,
        ${titleImage2} 720w,
        ${titleImage3} 1080w
      `}
      alt="픽션X던파 크리에이티브 리그 2019"
    />
    <Styled.IntroImage
      src={introImage}
      srcSet={`
        ${introImage} 360w,
        ${introImage2} 720w,
        ${introImage3} 1080w
      `}
      alt="총 상금 4,000만원 규모 #던파크리, 발동!"
    />
  </>
);

export default Intro;
