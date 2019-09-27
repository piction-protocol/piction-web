import React from 'react';
import styled from 'styled-components';

import Title from './Title';
import Intro from './Intro';
import Participate from './Participate';
import Prize from './Prize';
import Notice from './Notice';

const Styled = {
  Article: styled.article`
    --main-color: #00fff6;
    display: flex;
    flex-flow: column;
    position: relative;
  `,
  Title: styled(Title)`
    position: absolute;
    top: 0;
  `,
  Intro: styled(Intro)`
    padding-top: 64%;
  `,
};

function DNFCreativeLeague() {
  return (
    <Styled.Article>
      <Styled.Title />
      <Styled.Intro />
      <Participate />
      <Prize />
      <Notice />
    </Styled.Article>
  );
}

export default DNFCreativeLeague;
