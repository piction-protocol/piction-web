import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@reach/router';
import { ReactComponent as LogoComponent } from 'images/piction-logo.svg';
import { PrimaryButton, TertiaryButton } from 'components/atoms/Button';
import styled from 'styled-components';

import useCurrentUser from 'hooks/useCurrentUser';

import BG1 from './img_introduction_bg01.jpg';
import BG2 from './img_introduction_bg02.jpg';
import BG3 from './img_introduction_bg03.jpg';

const Introduction = styled.p`
  max-width: 620px;
  margin: 32px;
  text-align: center;
  word-break: keep-all;
`;

const Logo = styled(LogoComponent)`
  max-width: 612px;
  max-height: 158px;
`;

const CTA = styled.div`
  display: flex;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const HeroWrapper = styled.section`
  background-size: cover;
  background-position: top center;
  background-image: ${props => props.background};
  transition: all 1s ease;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 120px;
  padding-bottom: 120px;
  padding-left: 32px;
  padding-right: 32px;
`;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

const Hero = () => {
  const { currentUser } = useCurrentUser();

  const backgrounds = [BG1, BG2, BG3];
  const [currentBackground, setCurrentBackground] = useState(BG1);

  useInterval(() => {
    const currentBackgroundIndex = backgrounds.indexOf(currentBackground);
    const nextBG = backgrounds[(currentBackgroundIndex + 1) % 3];
    setCurrentBackground(nextBG);
  }, 5000);

  return (
    <HeroWrapper background={`url(${currentBackground})`}>
      <Logo />
      <CTA>
        {currentUser ? (
          <Link to="/dashboard">
            <PrimaryButton>서비스 시작</PrimaryButton>
          </Link>
        ) : (
          <Link to="/signup">
            <PrimaryButton>서비스 시작</PrimaryButton>
          </Link>
        )}
        <a href="https://about.piction.network">
          <TertiaryButton>프로젝트 소개</TertiaryButton>
        </a>
      </CTA>
      <Introduction>
        픽션은 창작자와 소비자를 직접 연결하는 새로운 디지털 콘텐츠 생태계입니다.
        픽션에서 자유롭게 콘텐츠를 연재하고, 크리에이터의 창작 활동을 응원하세요.
      </Introduction>
    </HeroWrapper>
  );
};

export default Hero;
