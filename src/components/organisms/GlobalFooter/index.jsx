import React from 'react';
import styled from 'styled-components';

import media from 'styles/media';

import { ReactComponent as Logo } from 'images/piction-logo--mini.svg';

const Styled = {
  Footer: styled.footer`
    display: flex;
    padding: var(--outer-gap) 0;
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
    ${media.desktop`
      flex-flow: row wrap;
      padding: 0 var(--column-gap);
    `}
  `,
  Logo: styled(Logo)`
    width: 36px;
    ${media.mobile`
      display: none;
    `}
  `,
  List: styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 0 16px;
    ${media.desktop`
      justify-content: flex-start;
    `}
  `,
  Item: styled.li`
    margin: 4px 8px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    text-align: center;
    ${media.desktop`
      margin: 4px 16px;
    `}
  `,
  Link: styled.a.attrs({
    target: '_blank',
  })`
    color: inherit;
  `,
};

function GlobalFooter() {
  return (
    <Styled.Footer>
      <Styled.Wrapper>
        <Styled.Logo />
        <div>
          <Styled.List>
            <Styled.Item>
              <Styled.Link href="https://t.me/pictionnetwork">
                Telegram Channel
              </Styled.Link>
            </Styled.Item>
            <Styled.Item>
              <Styled.Link href="https://open.kakao.com/o/gyVQbDM">
                KaKaotalk
              </Styled.Link>
            </Styled.Item>
            <Styled.Item>
              <Styled.Link href="https://medium.com/piction">
                Medium
              </Styled.Link>
            </Styled.Item>
            <Styled.Item>
              <Styled.Link href="https://github.com/piction-protocol">
                Github
              </Styled.Link>
            </Styled.Item>
            <Styled.Item>
              <Styled.Link href="https://www.youtube.com/channel/UCzT4fqmHbnrgJDB1eMjQUbA">
                Youtube
              </Styled.Link>
            </Styled.Item>
          </Styled.List>
          <Styled.List>
            <Styled.Item>Contact | contact@piction.network</Styled.Item>
            <Styled.Item>© 2018-2019 Piction Network. All rights reserved</Styled.Item>
          </Styled.List>
        </div>
      </Styled.Wrapper>
    </Styled.Footer>
  );
}

export default GlobalFooter;
