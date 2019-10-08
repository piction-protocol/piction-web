import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { MainGrid } from 'styles/Grid';

import titleImage from './title-desktop.png';
import { ReactComponent as allButton } from './btn-all.svg';

import images from './images.json';

const Styled = {
  Container: styled.section`
    display: flex;
    flex-flow: column;
    background-color: #001a31;
  `,
  Title: styled.img`
    margin: 80px auto 40px;
  `,
  Body: styled(MainGrid)`
    margin-bottom: 80px;
    flex-flow: column;
    grid-column: 1 / -1;
    align-items: center;
  `,
  Image: styled.a`
    display: flex;
    align-items: flex-start;
    grid-column: span 3;
    background-size: cover;
    background-position: center;
    &::after {
      content: '';
      padding-top: 50%;
    }
  `,
  Link: styled(Link)`
    display: flex;
    margin: 16px 10px 0;
    grid-column: 5 / -5;
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

const Featured = () => (
  <Styled.Container>
    <Styled.Title
      src={titleImage}
      alt="지금 뜨는 #던파크리, 집합!"
    />
    <Styled.Body>
      {images.map(image => (
        <Styled.Image
          href={image.path}
          key={image.image}
          target="_blank"
          style={{
            backgroundImage: `url(${image.image})`,
          }}
        />
      ))}
      <Styled.Link to="/tag/던파크리">
        <Styled.ButtonImage
          as={allButton}
        />
      </Styled.Link>
    </Styled.Body>
  </Styled.Container>
);

export default Featured;
