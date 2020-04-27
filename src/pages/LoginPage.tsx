import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import useRedirectWhenSignedIn from 'hooks/useRedirectWhenSignedIn'
import useLoginForm from 'hooks/useLoginForm'
import useRedirectURL from 'hooks/useRedirectURL'

import Heading from 'components/atoms/Heading'
import Checkbox from 'components/atoms/Checkbox'
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button'
import InputGroup from 'components/molecules/InputGroup'
import CompactTemplate from 'components/templates/CompactTemplate'

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
  RememberMe: styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  `,
  SubmitButton: styled(PrimaryButton)`
    width: 100%;
    margin-bottom: 8px;
  `,
  SignupButton: styled(SecondaryButton)`
    width: 100%;
    margin-bottom: 24px;
  `,
  ForgotPassword: styled(Link)`
    display: flex;
    margin: auto;
    color: var(--blue);
  `,
}

const LoginPage = () => {
  const redirectTo = useRedirectURL()

  useRedirectWhenSignedIn(redirectTo)

  const { register, errorMessage, submitForm } = useLoginForm({ redirectTo })

  return (
    <CompactTemplate>
      <Styled.Form onSubmit={submitForm}>
        <Styled.Heading>로그인</Styled.Heading>
        <Styled.InputGroup
          name="loginId"
          label="아이디"
          placeholder="아이디를 입력해주세요."
          autoComplete="loginId"
          required
          inputRef={register}
          invalid={!!errorMessage}
        />
        <Styled.InputGroup
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          autoComplete="current-password"
          required
          inputRef={register}
          errorMessage={errorMessage}
        />
        <Styled.RememberMe>
          <Styled.Checkbox
            name="rememberme"
            ref={register}
          />
          로그인 상태 유지
       </Styled.RememberMe>
        <Styled.SubmitButton
          as="input"
          type="submit"
          value="로그인"
        />
        <Styled.SignupButton
          as={Link}
          to={{
            pathname: "/signup",
            state: { redirectTo }
          }}
        >
          회원가입
        </Styled.SignupButton>
        <Styled.ForgotPassword to="/forgot_password">
          비밀번호를 잊으셨나요?
        </Styled.ForgotPassword>
      </Styled.Form>
    </CompactTemplate>
  );
}

export default LoginPage

