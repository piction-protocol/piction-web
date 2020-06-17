import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useTranslation, Trans } from 'react-i18next';

import { Link, navigate } from '@reach/router';

import useForm from 'hooks/useForm';
import useAPI from 'hooks/useAPI';

import Heading from 'components/atoms/Heading';
import Checkbox from 'components/atoms/Checkbox';
import { PrimaryButton } from 'components/atoms/Button';
import Spinner from 'components/atoms/Spinner';

import InputGroup from 'components/molecules/InputGroup';

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
    color: var(--gray);
    white-space: pre-wrap;
  `,
  Link: styled(Link)`
    color: var(--blue);
  `,
  Submit: styled(PrimaryButton).attrs({
    as: 'input',
    type: 'submit',
  })`
    width: 100%;
  `,
  Login: styled.p`
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    margin: 24px auto;
    color: var(--gray);
    white-space: pre-wrap;
  `,
};

function SignupForm({ location }) {
  const { t } = useTranslation();
  const [formData, { handleChange }] = useForm({
    loginId: '',
    email: '',
    password: '',
    passwordCheck: '',
    username: '',
    agree: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [API] = useAPI();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await API.user.create(formData);
      API.token.create(response.data.accessToken, {
        expires: new Date('2099-12-31T23:59:59'),
      });
      navigate('/signup/welcome', { replace: true, state: location.state });
    } catch (error) {
      setErrorMessage({
        [error.response.data.field]: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Heading>
        {t('회원가입')}
      </Styled.Heading>
      <Styled.InputGroup
        name="loginId"
        label={t('아이디')}
        placeholder={t('5자 이상 15자 미만')}
        autoComplete="username"
        onChange={handleChange}
        required
        errorMessage={errorMessage.loginId}
      />
      <Styled.InputGroup
        name="email"
        label={t('이메일')}
        placeholder="example@email.com"
        autoComplete="email"
        onChange={handleChange}
        required
        errorMessage={errorMessage.email}
      />
      <Styled.InputGroup
        name="password"
        label={t('비밀번호')}
        placeholder={t('6자 이상의 비밀번호')}
        type="password"
        autoComplete="new-password"
        onChange={handleChange}
        required
        errorMessage={errorMessage.password}
      />
      <Styled.InputGroup
        name="passwordCheck"
        label={t('비밀번호 재입력')}
        placeholder={t('비밀번호 재입력')}
        type="password"
        autoComplete="new-password"
        onChange={handleChange}
        required
        errorMessage={errorMessage.passwordCheck}
      />
      <Styled.InputGroup
        name="username"
        label={t('닉네임')}
        placeholder={t('2자 이상의 닉네임')}
        autoComplete="username"
        onChange={handleChange}
        required
        errorMessage={errorMessage.username}
      />
      <Styled.Terms>
        <Trans i18nKey="약관동의">
          <Styled.Checkbox
            name="agree"
            onChange={handleChange}
            checked={formData.agree}
            required
          />
          <Styled.Link as="a" href="/terms" target="_blank">서비스 이용약관</Styled.Link>
          및
          <Styled.Link as="a" href="/privacy" target="_blank">개인정보 처리방침</Styled.Link>
          에 동의합니다.
        </Trans>
      </Styled.Terms>
      <Styled.Submit
        value={t('동의 및 회원가입')}
      />
      <Styled.Login>
        {t('이미 픽션 계정을 가지고 있다면,')}
        {' '}
        <Styled.Link to="/login" state={location.state}>{t('로그인')}</Styled.Link>
      </Styled.Login>
      {isLoading && <Spinner />}
    </Styled.Form>
  );
}

SignupForm.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SignupForm;
