import React from 'react';
import styled from 'styled-components';

import image from './about-dnf-mobile.png';
import image2 from './about-dnf-mobile@2x.png';
import image3 from './about-dnf-mobile@3x.png';

const Styled = {
  Container: styled.section`
    display: flex;
    position: relative;
    flex-flow: column;
  `,
  Texts: styled.div`
    position: absolute;
    bottom: 0;
    margin: 0 4.44% 22.22%;
    font-size: 3.9vw;
    text-align: center;
  `,
  About: styled.p`
    margin-bottom: 4.5vw;
    color: var(--gray--dark);
  `,
  Link: styled.a`
    margin: 1.11vw;
    color: var(--white);
    font-weight: bold;
    text-decoration: underline;
  `,
};

const AboutDNF = () => (
  <Styled.Container>
    <img
      src={image}
      srcSet={`
        ${image} 360w,
        ${image2} 720w,
        ${image3} 1080w
      `}
      alt="던전앤파이터란?"
    />
    <Styled.Texts>
      <Styled.About>
        던전앤파이터(Dungeon & Fighter)는 네오플에서 제작하고 넥슨에서 서비스하는 온라인 액션 RPG입니다.
      </Styled.About>
      <Styled.Link href="http://df.nexon.com/df/guide/TO/574" target="_blank">
        던파 캐릭터 보기
      </Styled.Link>
      <Styled.Link href="http://df.nexon.com/df/community/ucc" target="_blank">
        던파 UCC 게시판
      </Styled.Link>
      <Styled.Link href="http://df.nexon.com/df/aradstudio/" target="_blank">
        아라드 스튜디오
      </Styled.Link>
    </Styled.Texts>
  </Styled.Container>
);

export default AboutDNF;
