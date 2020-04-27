import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import useSignupForm from 'hooks/useSignupForm'
import CompactTemplate from 'components/templates/CompactTemplate'
import Heading from 'components/atoms/Heading'
import Checkbox from 'components/atoms/Checkbox'
import { PrimaryButton } from 'components/atoms/Button'

import InputGroup from 'components/molecules/InputGroup'
import useRedirectURL from 'hooks/useRedirectURL'

const Styled = {
  Form: styled.form`
    display: flex;
    flex-flow: column;
    font-size: var(--font-size--small);
  `,
  Heading: styled(Heading)`
    margin-bottom: 24px;
    text-align: center;
  `,
  InputGroup: styled(InputGroup)`
    margin-bottom: 24px;
  `,
  Checkbox: styled(Checkbox)`
    margin-right: 8px;
  `,
  Terms: styled.label`
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    margin-bottom: 16px;
    color: var(--gray--dark);
    white-space: pre-wrap;
  `,
  Link: styled(Link)`
    color: var(--blue);
  `,
  SubmitButton: styled(PrimaryButton)`
    width: 100%;
  `,
  Login: styled.p`
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    margin: 24px auto;
    color: var(--gray--dark);
    white-space: pre-wrap;
  `,
}

const SignupPage = () => {
  const redirectTo = useRedirectURL()
  const { register, submitForm, errors } = useSignupForm({redirectTo})

  return (
    <CompactTemplate>
      <Styled.Form onSubmit={submitForm}>
        <Styled.Heading>회원가입</Styled.Heading>
        <Styled.InputGroup
          name="loginId"
          label="아이디"
          placeholder="5자 이상 15자 미만"
          autoComplete="username"
          inputRef={register}
          required
          errorMessage={errors.loginId?.message}
        />
        <Styled.InputGroup
          name="email"
          label="이메일"
          placeholder="example@email.com"
          autoComplete="email"
          required
          inputRef={register}
          errorMessage={errors.email?.message}
        />
        <Styled.InputGroup
          name="password"
          label="비밀번호"
          placeholder="6자 이상의 비밀번호"
          type="password"
          autoComplete="new-password"
          required
          inputRef={register}
          errorMessage={errors.password?.message}
        />
        <Styled.InputGroup
          name="passwordCheck"
          label="비밀번호 재입력"
          placeholder="비밀번호 재입력"
          type="password"
          autoComplete="new-password"
          required
          inputRef={register}
          errorMessage={errors.passwordCheck?.message}
        />
        <Styled.InputGroup
          name="username"
          label="닉네임"
          placeholder="2자 이상의 닉네임"
          autoComplete="username"
          required
          inputRef={register}
          errorMessage={errors.username?.message}
        />
        <Styled.Terms>
          <Styled.Checkbox
            name="agree"
            ref={register}
            required
          />
          <Styled.Link as="a" href="/terms" target="_blank">서비스 이용약관</Styled.Link>
          {' 및 '}
          <Styled.Link as="a" href="/privacy" target="_blank">개인정보 처리방침</Styled.Link>
          에 동의합니다.
        </Styled.Terms>
        <Styled.SubmitButton
          as="input"
          type="submit"
          value="동의 및 회원가입"
        />
        <Styled.Login>
          이미 픽션 계정을 가지고 있다면,
          {' '}
          <Styled.Link
            to={{
              pathname: "/login",
              state: {
                redirectTo
              }
            }}
          >
            로그인
          </Styled.Link>
        </Styled.Login>
      </Styled.Form>
    </CompactTemplate>
  )
}

export default SignupPage
