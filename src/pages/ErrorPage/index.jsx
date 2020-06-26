import React from 'react';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';

import { PrimaryButton } from 'components/atoms/Button';
import { ReactComponent as oopsImg } from './img-404-error.svg';

const Styled = {
  Main: styled.section`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: auto;
    color: var(--gray);
  `,
  Img: styled(oopsImg)`
    margin-bottom: 24px;
    object-fit: contain;
  `,
  Button: styled(PrimaryButton)`
    margin-top: 24px;
  `,
};

function ErrorPage() {
  const { t } = useTranslation();
  return (
    <Styled.Main>
      <Styled.Img />
      {t('페이지를 찾을 수 없습니다.')}
      <Styled.Button as={Link} to="/">
        {t('홈으로 돌아가기')}
      </Styled.Button>
    </Styled.Main>
  );
}

export default ErrorPage;
