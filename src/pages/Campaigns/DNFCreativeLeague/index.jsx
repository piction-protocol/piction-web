import React from 'react';
import styled from 'styled-components';

import useMedia from 'hooks/useMedia';

import { mediaQuery } from 'styles/media';

const DesktopIntro = React.lazy(() => import('./Intro/desktop'));
const MobileIntro = React.lazy(() => import('./Intro/mobile'));
const DesktopParticipate = React.lazy(() => import('./Participate/desktop'));
const MobileParticipate = React.lazy(() => import('./Participate/mobile'));
const DesktopPrize = React.lazy(() => import('./Prize/desktop'));
const MobilePrize = React.lazy(() => import('./Prize/mobile'));
const Notice = React.lazy(() => import('./Notice'));

const Styled = {
  Article: styled.article`
    --main-color: #00fff6;
    display: flex;
    position: relative;
    flex-flow: column;
    width: 100%;
  `,
};

function DNFCreativeLeague() {
  const isDesktop = useMedia(mediaQuery.desktop);

  return (
    <Styled.Article>
      {isDesktop ? (
        <>
          <DesktopIntro />
          <DesktopParticipate />
          <DesktopPrize />
        </>
      ) : (
        <>
          <MobileIntro />
          <MobileParticipate />
          <MobilePrize />
        </>
      )}
      <Notice />
    </Styled.Article>
  );
}

export default DNFCreativeLeague;
