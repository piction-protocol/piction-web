import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { MainGrid } from 'styles/Grid';

import image from './participate-desktop.png';
import { ReactComponent as ParticipateButton } from './btn-participate.svg';

const Styled = {
  Section: styled.section`
    background-color: #001629;
  `,
  MainGrid: styled(MainGrid)`
    position: relative;
  `,
  Image: styled.img`
    grid-column: 2 / -2;
    width: 100%;
  `,
  Start: styled.div`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    flex-flow: column;
    grid-column: 5 / -5;
    align-items: center;
    margin-top: 136%;
  `,
  Link: styled(Link)`
    display: flex;
    margin: 0 10px;
  `,
  ButtonImage: styled.svg`
    width: 100%;
    height: auto;
  `,
  Text: styled.p`
    margin-top: 24px;
    color: #858585;
    font-size: 18px;
    white-space: nowrap;
  `,
};

const Participate = () => (
  <Styled.Section>
    <Styled.MainGrid>
      <Styled.Image
        src={image}
        alt="참가방법"
      />
      <Styled.Start>
        <Styled.Link to="/dashboard/new-project?tag=던파크리">
          <Styled.ButtonImage
            as={ParticipateButton}
          />
        </Styled.Link>
        <Styled.Text>
          이벤트에 참가하려면 픽션 계정이 필요합니다.
        </Styled.Text>
      </Styled.Start>
    </Styled.MainGrid>
  </Styled.Section>
);

export default Participate;
