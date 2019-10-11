import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from '@reach/router';

import MainGrid from '../Grid';

import titleImage from './title-desktop.png';
import { ReactComponent as allButton } from './btn-all.svg';

import images from './images.json';

const createNthChildStyle = () => {
  let style = '';

  for (let n = 0; n < 4; n += 1) {
    style += `
      &:nth-child(${n + 1}) {
        -ms-grid-column: ${n * 6 + 1};
      }
    `;
  }

  return css`${style}`;
};

const Styled = {
  Container: styled.section`
    display: flex;
    flex-shrink: 0;
    flex-flow: column;
    align-items: center;
    background-color: #001a31;
  `,
  Title: styled.img`
    margin: 80px auto 40px;
  `,
  Body: styled(MainGrid)`
    flex-shrink: 0;
    margin-bottom: 80px;
  `,
  Image: styled.a`
    display: flex;
    align-items: flex-start;
    -ms-grid-column-span: 5;
    -ms-grid-row: 1;
    grid-row: 1;
    grid-column: span 3;
    background-size: cover;
    background-position: center;
    &::after {
      content: '';
      display: block;
      width: 100%;
      padding-top: 50%;
      background-color: rgba(0, 26, 49, .5);
    }
    &:hover::after {
      visibility: hidden;
    }
    ${createNthChildStyle()};
  `,
  Link: styled(Link)`
    display: flex;
    margin: 16px 10px 0;
    -ms-grid-column: 9;
    -ms-grid-column-span: 7;
    grid-column: 5 / -5;
    -ms-grid-row: 2;
    grid-row: 2;
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
