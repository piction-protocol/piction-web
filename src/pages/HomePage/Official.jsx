import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
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
  Label: styled.span`
    font-weight: 600;
    opacity: 0.5;
    display: block;
    font-size: 14px;
    margin-bottom: 4px;
    ${media.desktop`
      font-size: 16px;
      display: inline;
      margin-right: 8px;
    `}
  `,
  Link: styled(Link)`
    grid-column: 1 / -1;
    background-color: rgba(26, 146, 255, 0.1);
    color: var(--blue);
    font-weight: bold;
    border-radius: 12px;
    font-size: 18px;
    padding: 20px;
    ${media.desktop`
      padding: 24px;
      text-align: center;
      border-radius: 37.5px;
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
