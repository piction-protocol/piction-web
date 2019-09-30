import React from 'react';
import styled from 'styled-components';

import { MainGrid } from 'styles/Grid';

import image from './participate-desktop.png';

const Styled = {
  Section: styled.section`
    background-color: #001629;
  `,
  Image: styled.img`
    grid-column: 2 / -2;
    width: 100%;
  `,
};

const Participate = props => (
  <Styled.Section>
    <MainGrid>
      <Styled.Image
        src={image}
        alt="참가방법"
        {...props}
      />
    </MainGrid>
  </Styled.Section>
);

export default Participate;
