import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';

import media from 'styles/media';

import { ReactComponent as JoinImage } from 'images/img-join-done.svg';

import { PrimaryButton } from 'components/atoms/Button';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-flow: column;
    text-align: center;
  `,
  Heading: styled.h1`
    font-size: var(--font-size--base);
  `,
  Image: styled(JoinImage)`
    width: 100px;
    height: 100px;
    margin: 24px auto;
    ${media.desktop`
      width: 190px;
      height: 190px;
    `}
  `,
  Text: styled.p`
    font-size: var(--font-size--small);
  `,
  Button: styled(PrimaryButton).attrs({
    as: Link,
  })`
    margin-top: 24px;
  `,
};

function Welcome({ redirectTo = '/' }) {
  const { t } = useTranslation();
  return (
    <Styled.Container>
      <Styled.Heading>{t('회원가입이 완료되었습니다!')}</Styled.Heading>
      <Styled.Image />
      <Styled.Text>
        {t('지금 바로 PICTION에서')}
        <br />
        {t('다양한 창작물을 즐겨보세요!')}
      </Styled.Text>
      <Styled.Button to={redirectTo}>{t('계속')}</Styled.Button>
    </Styled.Container>
  );
}

Welcome.propTypes = {
  redirectTo: PropTypes.string,
};

export default Welcome;
