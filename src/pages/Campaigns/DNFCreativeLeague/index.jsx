import React from 'react';
import styled from 'styled-components/macro';

import useMedia from 'hooks/useMedia';

import { mediaQuery } from 'styles/media';

const DesktopIntro = React.lazy(() => import('./Intro/desktop'));
const MobileIntro = React.lazy(() => import('./Intro/mobile'));
const Notice = React.lazy(() => import('./Notice'));

const Styled = {
  Article: styled.article`
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
      {isDesktop ? <DesktopIntro /> : <MobileIntro />}
      <Notice />
    </Styled.Article>
  );
}

export default DNFCreativeLeague;
