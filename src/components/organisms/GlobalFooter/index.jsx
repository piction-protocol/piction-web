import React from 'react';
import styled from 'styled-components';

import media from 'styles/media';

import { ReactComponent as Logo } from 'images/img-piction-logo--gray.svg';

const Styled = {
  Footer: styled.footer`
    display: flex;
    margin-top: auto;
    padding: var(--row-gap) 0;
    border-top: 1px solid var(--gray--light);
    background-color: var(--white);
    ${media.desktop`
      height: 112px;
    `}
  `,
  Wrapper: styled.div`
    display: flex;
    flex: 1;
    flex-flow: column;
    align-items: center;
    max-width: var(--max-width);
    height: 100%;
    margin: auto;
    padding: 0 var(--outer-gap);
    ${media.desktop`
      flex-flow: row wrap;
    `}
  `,
  Logo: styled(Logo)`
    width: 104px;
    height: auto;
    margin-top: 16px;
    ${media.desktop`
      order: -1;
      width: 152px;
      margin-top: 0;
    `}
  `,
  Links: styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    ${media.desktop`
      justify-content: flex-start;
      margin-left: 32px;
    `}
    > *:not(:last-child) {
      margin-right: 16px;
      ${media.desktop`
        margin-right: 32px;
      `}
    }
  `,
  Texts: styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    ${media.desktop`
      flex-flow: column;
      margin-left: auto;
      text-align: right;
    `}
  `,
  Item: styled.li`
    margin-bottom: 10px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    ${media.desktop`
      margin: 4px 0;
    `}
  `,
  Link: styled.a.attrs({
    target: '_blank',
  })`
    color: inherit;
  `,
  Em: styled.em`
    color: var(--black);
    font-style: normal;
  `,
};

function GlobalFooter() {
  return (
    <Styled.Footer>
      <Styled.Wrapper>
        <Styled.Links>
          <Styled.Item>
            <Styled.Link href="/terms">
              서비스 이용약관
            </Styled.Link>
          </Styled.Item>
          <Styled.Item>
            <Styled.Link href="/privacy">
              <Styled.Em>
                개인정보 처리방침
              </Styled.Em>
            </Styled.Link>
          </Styled.Item>
          <Styled.Item>
            <Styled.Link href="https://about.piction.network">
              픽션 네트워크 프로젝트 소개
            </Styled.Link>
          </Styled.Item>
        </Styled.Links>
        <Styled.Texts>
          <Styled.Item>Contact | help@piction.network</Styled.Item>
          <Styled.Item>© 2018-2019 Piction Network. All rights reserved</Styled.Item>
        </Styled.Texts>
        <Styled.Logo />
      </Styled.Wrapper>
    </Styled.Footer>
  );
}

export default GlobalFooter;
