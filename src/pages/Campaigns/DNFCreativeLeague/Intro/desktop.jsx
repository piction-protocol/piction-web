import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import titleBackground from './bg-title.png';
import gunnerBackground from './bg-gunner.png';
import thunderImage from './bg-thunder-type-01.png';
import mageImage from './chr-mage.png';
import introImage from './intro-desktop.png';

import Prize1stImage from './img-prize-1-st.png';
import Prize2ndImage from './img-prize-2-nd.png';
import Prize3rdImageTitle from './img-prize-3-rd-title.png';
import Prize3rdImage1 from './img-prize-3-rd-01.png';
import Prize3rdImage2 from './img-prize-3-rd-02.png';

const Styled = {
  Section: styled.section`
    position: relative;
    flex-shrink: 0;
    background-color: #00213d;
    text-align: center;
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
  Wrapper: styled.div`
    position: relative;
    max-width: 1440px;
    margin: 0 auto;
  `,
  Mage: styled.img`
    position: relative;
    z-index: 2;
    width: 100%;
    background-image: url(${gunnerBackground});
    background-size: contain;
    background-repeat: no-repeat;
  `,
  IntroImage: styled.img`
    margin: -50px auto 0;
  `,
  Thunder: styled.img`
    position: absolute;
    z-index: 1;
    width: 16.667%;
    top: 38.5%;
    right: 18%;
  `,
  Image: styled.img`
    max-width: 610px;
  `,
  Prize1st: styled.div`
    padding: 138px 0 160px;
    background-color: #00213d;
  `,
  Prize2nd: styled.div`
    padding: 160px 0;
    background-color: #001629;
  `,
  Prize3rd: styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    background-color: #00213d;
    padding: 120px 0;
    a + a {
      margin-left: 100px;
    }
  `,
  Prize3rdTitleImage: styled.img`
    width: 166px;
    margin: 0 auto 40px;
  `,
};

const Intro = () => (
  <Styled.Section>
    <Styled.Background src={titleBackground} />
    <Styled.Wrapper>
      <Styled.Mage
        src={mageImage}
        alt="픽션X던파 크리에이티브 리그 2019"
      />
      <Styled.IntroImage
        src={introImage}
        alt="총 상금 4,000만원 규모 #던파크리, 수상작 발표!"
      />
      <Styled.Thunder src={thunderImage} />
    </Styled.Wrapper>
    <Styled.Prize1st>
      <Link to="/project/dolechan/posts">
        <Styled.Image src={Prize1stImage} alt="대상 ♡도레챤 러브하우스 ♡ by 도레챤" />
      </Link>
    </Styled.Prize1st>
    <Styled.Prize2nd>
      <Link to="/project/5star/posts">
        <Styled.Image src={Prize2ndImage} alt="최우수상 던파는 끊어도 팬아트는 못끊겠어 by 색별" />
      </Link>
    </Styled.Prize2nd>
    <Styled.Prize3rd>
      <Styled.Prize3rdTitleImage src={Prize3rdImageTitle} alt="우수상" />
      <div>
        <Link to="/project/dnf-sisters/posts">
          <Styled.Image src={Prize3rdImage1} alt="던파의 누님들 by 남실" />
        </Link>
        <Link to="/project/piter100/posts">
          <Styled.Image src={Prize3rdImage2} alt="마법사의방 by 피터지게냥" />
        </Link>
      </div>
    </Styled.Prize3rd>
  </Styled.Section>
);

export default Intro;
