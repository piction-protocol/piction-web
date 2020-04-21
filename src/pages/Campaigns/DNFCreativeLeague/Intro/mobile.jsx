import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import titleImage from './title-mobile.png';
import titleImage2 from './title-mobile@2x.png';
import titleImage3 from './title-mobile@3x.png';

import Prize1stBackground from './bg-prize-1-st.jpg';
import Prize1stImage from './img-prize-1-st.png';
import Prize2ndImage from './img-prize-2-nd.png';
import Prize3rdImageTitle from './img-prize-3-rd-title.png';
import Prize3rdImage1 from './img-prize-3-rd-01.png';
import Prize3rdImage2 from './img-prize-3-rd-02.png';

const Styled = {
  TitleImage: styled.img`
    position: absolute;
    top: 0;
    width: 100%;
  `,
  Image: styled.img`
    width: 100%;
  `,
  Prize1st: styled.div`
    margin-top: 64%;
    padding: 100% 5.5555% 22.222%;
    background-color: #00213d;
    background-image: url(${Prize1stBackground});
    background-size: contain;
    background-repeat: no-repeat;
  `,
  Prize2nd: styled.div`
    padding: 22.222% 5.5555%;
    background-color: #001629;
  `,
  Prize3rd: styled.div`
    display: flex;
    flex-flow: column;
    padding: 22.222% 0 0;
    background-color: #00213d;
    a {
      margin: 0 16.667% 22.222%;
    }
  `,
  Prize3rdTitleImage: styled.img`
    width: 32.5%;
    margin: 0 auto 22.222%;
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
      <Link to="/project/dnf-sisters/posts">
        <Styled.Image src={Prize3rdImage1} alt="던파의 누님들 by 남실" />
      </Link>
      <Link to="/project/piter100/posts">
        <Styled.Image src={Prize3rdImage2} alt="마법사의방 by 피터지게냥" />
      </Link>
    </Styled.Prize3rd>
  </>
);

export default Intro;
