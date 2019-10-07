import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import image from './participate-mobile.png';
import image2 from './participate-mobile@2x.png';
import image3 from './participate-mobile@3x.png';

import { ReactComponent as ParticipateButton } from './btn-participate.svg';

const Styled = {
  Container: styled.section`
    display: flex;
    position: relative;
    flex-flow: column;
  `,
  Start: styled.div`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    flex-flow: column;
    align-items: center;
    width: 72.5%;
    margin: 96.4% auto 0;
  `,
  Link: styled(Link)`
    display: flex;
    width: 100%;
  `,
  ButtonImage: styled.svg`
    width: 100%;
    height: auto;
  `,
  Text: styled.p`
    margin-top: 4.5%;
    color: #858585;
    font-size: 3.6vw;
  `,
};

const Participate = () => (
  <Styled.Container>
    <img
      src={image}
      srcSet={`
        ${image} 360w,
        ${image2} 720w,
        ${image3} 1080w
      `}
      alt="참가방법"
    />
    <Styled.Start>
      <Styled.Link to="/dashboard/new-project?tag=던파크리">
        <Styled.ButtonImage as={ParticipateButton} />
      </Styled.Link>
      <Styled.Text>
        이벤트에 참가하려면 픽션 계정이 필요합니다.
      </Styled.Text>
    </Styled.Start>
  </Styled.Container>
);

export default Participate;
