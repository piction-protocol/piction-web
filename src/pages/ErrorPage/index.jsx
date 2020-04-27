import React from 'react';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import media from 'styles/media';

import { PrimaryButton } from 'components/atoms/Button';
import { ReactComponent as errorpage } from './img-404-error.svg';

const Styled = {
  Main: styled.section`
    display: flex;
    flex-flow: column;
    align-items: center;
  `,
  Img: styled(errorpage)`
  width: 328px;
  height: 140px;
  object-fit: contain;
  ${media.desktop`
  width: 611px;
  height: 261px;
    `}
  `,
  BottomLetter: styled.section`
  width: 94px;
  height: 20px;
  font-family: NotoSansCJKkr;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: white;
  `,
  Button: styled(PrimaryButton).attrs({ as: Link })`
  margin-bottom: 8px;
  width: 134px;
  height: 52px;
  `,
  TopLetter: styled.h4`
  width: 195px;
  height: 31px;
  font-family: NotoSansCJKkr;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.72;
  letter-spacing: normal;
  text-align: center;
  color: #BFBFBF;
  `,
  Box: styled.section`
  padding-bottom: 50px;
  ${media.desktop`
  padding-bottom: 60px;
    `}
  `,
  TopBox: styled.section`
  padding-bottom: 50px;
  padding-top: 90px;
  ${media.desktop`
  padding-bottom: 70px;
  padding-top: 90px;
    `}
  `,
};

function ErrorPage() {
  return (
    <Styled.Main>
      <Styled.TopBox>
        <Styled.Img />
      </Styled.TopBox>
      <Styled.Box>
        <Styled.TopLetter>
          페이지를 찾을 수 없습니다.
        </Styled.TopLetter>
      </Styled.Box>
      <Styled.Button as={Link} to="/">
        <Styled.BottomLetter>
          홈으로 돌아가기
        </Styled.BottomLetter>
      </Styled.Button>
    </Styled.Main>
  );
}

export default ErrorPage;
