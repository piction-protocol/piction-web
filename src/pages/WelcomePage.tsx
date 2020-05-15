import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import media from 'styles/media'

import useRedirectURL from 'hooks/useRedirectURL'

import { PrimaryButton } from 'components/atoms/Button'
import CompactTemplate from 'components/templates/CompactTemplate'

import { ReactComponent as JoinImage } from 'images/img-join-done.svg'

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
  Button: styled(PrimaryButton)`
    margin-top: 24px;
  `,
}

const WelcomePage = () => {
  const redirectTo = useRedirectURL()

  return (
    <CompactTemplate>
      <Styled.Container>
        <Styled.Heading>회원가입이 완료되었습니다!</Styled.Heading>
        <Styled.Image />
        <Styled.Text>
          지금 바로 PICTION에서
          <br />
          다양한 창작물을 즐겨보세요!
        </Styled.Text>
        <Styled.Button as={Link} to={redirectTo}>계속</Styled.Button>
      </Styled.Container>
    </CompactTemplate>
  );
}

export default WelcomePage
