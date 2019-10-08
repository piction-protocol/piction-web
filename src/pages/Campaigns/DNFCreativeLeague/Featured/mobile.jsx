import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import titleImage from './title-mobile.png';
import titleImage2 from './title-mobile@2x.png';
import titleImage3 from './title-mobile@3x.png';

import { ReactComponent as allButton } from './btn-all.svg';

import images from './images.json';

const Styled = {
  Container: styled.section`
    display: flex;
    flex-flow: column;
    background-color: #001a31;
  `,
  Title: styled.img`
    width: 58.8889%;
    margin: 16.6667% auto 6.6667%;
  `,
  Body: styled.div`
    display: flex;
    flex-flow: column;
    margin: 0 auto 16.667%;
  `,
  Images: styled.div`
    display: flex;
    margin: 0 4.4445% 3.3333%;
    padding-bottom: 3.3333%;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  `,
  Image: styled.a`
    display: flex;
    align-items: flex-start;
    flex: 1 0 auto;
    width: 82.927%;
    margin-right: 2.5%;
    background-image: url(${({ image }) => image});
    background-size: cover;
    background-position: center;
    &::after {
      content: '';
      padding-top: 50%;
    }
  `,
  Link: styled(Link)`
    display: flex;
    width: 72.5%;
    margin: 0 auto;
  `,
  ButtonImage: styled.svg`
    width: 100%;
    height: auto;
  `,
};


const Featured = () => (
  <Styled.Container>
    <Styled.Title
      src={titleImage}
      srcSet={`
        ${titleImage} 360w,
        ${titleImage2} 720w,
        ${titleImage3} 1080w
      `}
      alt="지금 뜨는 #던파크리, 집합!"
    />
    <Styled.Body>
      {images.length > 0 && (
        <Styled.Images>
          {images.map(image => (
            <Styled.Image href={image.path} key={image.image} image={image.image} target="_blank" />
          ))}
        </Styled.Images>
      )}
      <Styled.Link to="/tag/던파크리">
        <Styled.ButtonImage as={allButton} />
      </Styled.Link>
    </Styled.Body>
  </Styled.Container>
);

export default Featured;
