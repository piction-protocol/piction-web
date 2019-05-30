import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Logo } from 'images/piction-logo--mini.svg';

const Styled = {
  Footer: styled.footer`
    height: 112px;
    border-top: 1px solid var(--gray--light);
    background-color: var(--white);
  `,
  Wrapper: styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    max-width: var(--max-width);
    height: 100%;
    margin: auto;
    padding: 0 var(--gap);
  `,
  Logo: styled(Logo)`
    width: 36px;
    margin-right: 32px;
    vertical-align: middle;
  `,
  List: styled.ul`
    display: flex;
    & + & {
      margin-top: 8px;
    }
  `,
  Item: styled.li`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    & + & {
      margin-left: 32px;
    }
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
                Telegram
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
