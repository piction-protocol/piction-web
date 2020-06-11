import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useCookies } from 'react-cookie';

import media from 'styles/media';

import { ReactComponent as Logo } from 'images/img-piction-logo--gray.svg';
import i18n from 'language/i18n';

const Styled = {
  Footer: styled.footer`
    display: flex;
    flex-flow: column;
    margin-top: auto;
    padding: 24px 0;
    border-top: 1px solid #F2F2F2;
    border-top: 1px solid var(--gray--pale);
    background-color: #FFFFFF;
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
    width: 100%;
    max-width: 1280px;
    max-width: var(--max-width);
    height: 100%;
    margin: auto;
    padding: 0 var(--outer-gap);
    ${media.desktop`
      flex-flow: row wrap;
      padding: 0 20px;
      padding: 0 var(--outer-gap);
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
    color: #BFBFBF;
    color: var(--gray);
    font-size: 14px;
    font-size: var(--font-size--small);
    list-style: none;
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
    color: #000000;
    color: var(--black);
    font-style: normal;
  `,
  Lang: styled.select`
    margin-left: 20px;
    border: 1px solid var(--gray);
    width: 95px;
    height: 38px;
  `,
};

function GlobalFooter() {
  const { t } = useTranslation();
  const [cookie, setCookie] = useCookies(['translate']);
  const valueOfLang = cookie.translate === undefined ? i18n.language : cookie.translate;
  const handleLanguage = (e) => {
    setCookie('translate', e.target.value, { expires: moment().add(12, 'hours').toDate(), path: '/' });
    i18n.changeLanguage(`${e.target.value}`);
  };
  return (
    <Styled.Footer>
      <Styled.Wrapper>
        <Styled.Links>
          <Styled.Item>
            <Styled.Link href="/terms">
              {t('서비스 이용약관')}
            </Styled.Link>
          </Styled.Item>
          <Styled.Item>
            <Styled.Link href="/privacy">
              <Styled.Em>
                {t('개인정보 처리방침')}
              </Styled.Em>
            </Styled.Link>
          </Styled.Item>
          <Styled.Item>
            <Styled.Link href="https://about.piction.network">
              {t('프로젝트 소개')}
            </Styled.Link>
          </Styled.Item>
        </Styled.Links>
        <Styled.Texts>
          <Styled.Item>Contact | help@piction.network</Styled.Item>
          <Styled.Item>© 2018-2020 Piction Network. All rights reserved</Styled.Item>
        </Styled.Texts>
        <Styled.Lang value={valueOfLang} onChange={handleLanguage}>
          <option value="kr" selected>한국어</option>
          <option value="en">English</option>
        </Styled.Lang>
        <Styled.Logo />
      </Styled.Wrapper>
    </Styled.Footer>
  );
}

export default GlobalFooter;
