import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';

import useMedia from 'hooks/useMedia';
import useCurrentUser from 'hooks/useCurrentUser';

import media, { mediaQuery } from 'styles/media';
import { MainGrid } from 'styles/Grid';

import { PrimaryButton, TertiaryButton } from 'components/atoms/Button';

import { ReactComponent as LogoComponent } from 'images/piction-logo.svg';

import BG1 from './img_introduction_bg01.jpg';
import BG2 from './img_introduction_bg02.jpg';
import BG3 from './img_introduction_bg03.jpg';

const HeroWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 64px 16px;
  background-size: cover;
  background-position: top center;
  background-image: ${props => props.background};
  transition: background-image 1s ease;
`;

const Logo = styled(LogoComponent)`
  grid-column: 2 / -2;
  ${media.desktop`
    grid-column: 4 / -4;
    margin-bottom: 24px;
  `}
`;

const CTA = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  ${media.desktop`
    display: grid;
    grid-column: 5 / -5;
    grid-template-columns: repeat(4, 1fr);
    column-gap: var(--column-gap);
    margin-bottom: 24px;
  `}
  > * {
  margin: 0 4px;
  ${media.desktop`
    grid-column: span 2;
    margin: 0;
  `}
  }
`;

const Introduction = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  word-break: keep-all;
  ${media.mobile`
    br {
      display: none;
    }
  `}
`;

const EnglishIntroduction = styled.p`
  grid-column: 1 / -1;
  color: var(--gray--dark);
  text-align: center;
  word-break: break-world;
  a {
    color: var(--blue);
  }
  ${media.desktop`
    font-size: 14px;
    br {
      display: none;
    }
  `}
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

const Hero = ({ projectsRef }) => {
  const { currentUser } = useCurrentUser();
  const isDesktop = useMedia(mediaQuery.desktop);

  const backgrounds = [BG1, BG2, BG3];
  const [currentBackground, setCurrentBackground] = useState(BG1);

  useInterval(() => {
    const currentBackgroundIndex = backgrounds.indexOf(currentBackground);
    const nextBG = backgrounds[(currentBackgroundIndex + 1) % 3];
    setCurrentBackground(nextBG);
  }, 5000);

  return (
    <HeroWrapper background={`url(${currentBackground})`}>
      <MainGrid>
        <Logo />
        <CTA>
          {currentUser ? (
            isDesktop ? (
              <PrimaryButton
                as={Link}
                to="/dashboard"
                size={isDesktop ? 'normal' : 'mini'}
              >
                서비스 시작
              </PrimaryButton>
            ) : (
              <PrimaryButton
                size="mini"
                onClick={() => {
                  projectsRef.current.scrollIntoView({
                    behavior: 'smooth',
                  });
                }}
              >
                추천 프로젝트
              </PrimaryButton>
            )
          ) : (
            <PrimaryButton
              as={Link}
              to="/signup"
              size={isDesktop ? 'normal' : 'mini'}
            >
              서비스 시작
            </PrimaryButton>
          )}
          <TertiaryButton
            as="a"
            href="https://about.piction.network"
            size={isDesktop ? 'normal' : 'mini'}
          >
            픽션 네트워크 소개
          </TertiaryButton>
        </CTA>
        <Introduction>
          픽션은 창작자와 소비자를 직접 연결하는 새로운 디지털 콘텐츠 생태계입니다.
          <br />
          픽션에서 자유롭게 콘텐츠를 연재하고, 크리에이터의 창작 활동을 응원하세요.
        </Introduction>
        <EnglishIntroduction>
          English service is not currently supported.
          <br />
          {' '}
          <a href="https://about.piction.network/en/">Click here</a>
          {' '}
          to view the project information.
        </EnglishIntroduction>
      </MainGrid>
    </HeroWrapper>
  );
};

Hero.propTypes = {
  projectsRef: PropTypes.object.isRequired,
};

export default Hero;
