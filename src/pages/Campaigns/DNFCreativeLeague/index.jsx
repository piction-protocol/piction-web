import React from 'react';
import styled from 'styled-components';

import useMedia from 'hooks/useMedia';

import { mediaQuery } from 'styles/media';

import DesktopIntro from './Intro/desktop';
import MobileIntro from './Intro/mobile';
import DesktopParticipate from './Participate/desktop';
import MobileParticipate from './Participate/mobile';
import DesktopPrize from './Prize/desktop';
import MobilePrize from './Prize/mobile';
import Notice from './Notice';

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
