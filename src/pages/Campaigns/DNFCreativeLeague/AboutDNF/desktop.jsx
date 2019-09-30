import React from 'react';
import styled from 'styled-components';

import { MainGrid } from 'styles/Grid';

import title from './about-dnf.png';
import logo from './logo-dnf.png';

const Styled = {
  Container: styled.section`
    padding: 92px 0;
    background-color: #001629;
  `,
  Texts: styled.div`
    grid-column: 3 / span 5;
    margin: auto 0;
  `,
  About: styled.p`
    margin: 16px 0;
    color: var(--gray--dark);
    font-size: 16px;
    word-break: keep-all;
  `,
  Link: styled.a`
    margin-right: 8px;
    color: var(--white);
    font-size: var(--font-size--small);
    font-weight: bold;
    text-decoration: underline;
  `,
  Logo: styled.img`
    grid-column: span 3;
  `,
};

const AboutDNF = () => (
  <Styled.Container>
    <MainGrid>
      <Styled.Texts>
        <img src={title} alt="던전앤파이터란?" />
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
      <Styled.Logo src={logo} />
    </MainGrid>
  </Styled.Container>
);

export default AboutDNF;
