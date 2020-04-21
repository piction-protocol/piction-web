import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { MainGrid } from 'styles/Grid';
import media from 'styles/media';

const Styled = {
  Section: styled(MainGrid).attrs({
    as: 'section',
  })`
    margin: 0 auto;
    ${media.desktop`
      margin: 0 auto 30px;
    `}
  `,
  Link: styled(Link)`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -1;
    border-radius: 12px;
    padding: 20px;
    background-color: rgba(26, 146, 255, 0.1);
    color: var(--blue);
    font-size: var(--font-size--base);
    font-weight: bold;
    ${media.desktop`
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
      padding: 24px;
      border-radius: 37.5px;
    `}
  `,
  Label: styled.span`
    opacity: 0.5;
    font-size: var(--font-size--small);
    font-family: var(--poppins);
    font-weight: bold;
    ${media.mobile`
      margin-bottom: 4px;
    `}
    ${media.desktop`
      margin-right: 8px;
      font-size: 16px;
    `}
  `,
};

const Official = () => (
  <Styled.Section>
    <Styled.Link to="/project/piction/posts">
      <Styled.Label>What&apos;s New</Styled.Label>
      픽션 공식 프로젝트에서 픽션의 새로운 소식들을 만나보세요!
    </Styled.Link>
  </Styled.Section>
);

export default Official;
