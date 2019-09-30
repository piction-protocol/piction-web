import React from 'react';
import styled from 'styled-components';

import { MainGrid } from 'styles/Grid';

import image from './prize-desktop.png';

const Styled = {
  Section: styled.section`
    background-color: #000000;
  `,
  Image: styled.img`
    grid-column: 2 / -2;
    width: 100%;
  `,
};

const Prize = props => (
  <Styled.Section>
    <MainGrid>
      <Styled.Image
        src={image}
        alt="수상 안내"
        {...props}
      />
    </MainGrid>
  </Styled.Section>
);

export default Prize;
