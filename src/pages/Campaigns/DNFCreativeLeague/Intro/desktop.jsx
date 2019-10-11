import React from 'react';
import styled from 'styled-components';

import { MainGrid } from 'styles/Grid';

import titleBackground from './bg-title.png';
import gunnerBackground from './bg-gunner.png';
import thunderImage1 from './bg-thunder-type-01.png';
import thunderImage2 from './bg-thunder-type-02.png';
import mageImage from './chr-mage.png';
import introImage from './intro-desktop.png';

const Styled = {
  Section: styled.section`
    position: relative;
    flex-shrink: 0;
    background-color: #00213d;
    text-align: center;
  `,
  Wrapper: styled.div`
    max-width: 1440px;
    margin: 0 auto;
  `,
  Background: styled.img`
    position: absolute;
    top: 0;
    z-index: 1;
    right: 0;
    left: 0;
    width: 100%;
    max-height: 895px;
  `,
  Mage: styled.img`
    position: relative;
    z-index: 2;
    width: 100%;
    background-image: url(${gunnerBackground});
    background-size: contain;
    background-repeat: no-repeat;
  `,
  MainGrid: styled(MainGrid)`
    position: relative;
    width: 100%;
    max-width: 1280px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 20px;
    padding-left: 20px;
  `,
  Image: styled.img`
    grid-column: 2 / -2;
    width: 100%;
    max-width: 1030px;
    margin: -21.85% auto 0;
  `,
  Thunder1: styled.img`
    position: absolute;
    z-index: 1;
    right: 14.113%;
    bottom: 38.2%;
  `,
  Thunder2: styled.img`
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: -30%;
    grid-column: 1 / span 2;
  `,
};

const Intro = () => (
  <Styled.Section>
    <Styled.Wrapper>
      <Styled.Background src={titleBackground} />
      <Styled.Mage
        src={mageImage}
        alt="픽션X던파 크리에이티브 리그 2019"
      />
      <Styled.MainGrid>
        <Styled.Image
          src={introImage}
          alt="총 상금 4,000만원 규모 #던파크리, 발동!"
        />
        <Styled.Thunder1 src={thunderImage1} />
        <Styled.Thunder2 src={thunderImage2} />
      </Styled.MainGrid>
    </Styled.Wrapper>
  </Styled.Section>
);

export default Intro;
