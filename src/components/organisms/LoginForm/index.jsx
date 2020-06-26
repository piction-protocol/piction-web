import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link, navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';

import useForm from 'hooks/useForm';
import useAPI from 'hooks/useAPI';

import Heading from 'components/atoms/Heading';
import Checkbox from 'components/atoms/Checkbox';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

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
  RememberMe: styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  `,
  Submit: styled(PrimaryButton).attrs({
    as: 'input',
    type: 'submit',
  })`
    width: 100%;
    margin-bottom: 8px;
  `,
  Signup: styled(SecondaryButton).attrs({
    as: Link,
  })`
    width: 100%;
    margin-bottom: 24px;
  `,
  ForgotPassword: styled(Link)`
    display: flex;
    margin: auto;
    color: var(--blue);
  `,
};

function LoginForm({ redirectTo = '/' }) {
  const { t } = useTranslation();
  const [formData, { handleChange }] = useForm({
    loginId: '',
    password: '',
    rememberme: true,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [API] = useAPI();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await API.session.create(formData);
      await API.token.create(response.data.accessToken, formData.rememberme && {
        expires: new Date('2099-12-31T23:59:59'),
      });
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Heading>
        {t('로그인')}
      </Styled.Heading>
      <Styled.InputGroup
        name="loginId"
        label={t('아이디')}
        placeholder={t('아이디를 입력해주세요.')}
        autoComplete="loginId"
        required
        onChange={handleChange}
        value={formData.loginId}
        invalid={!!errorMessage}
      />
      <Styled.InputGroup
        name="password"
        label={t('비밀번호')}
        placeholder={t('비밀번호를 입력해주세요.')}
        type="password"
        autoComplete="current-password"
        required
        onChange={handleChange}
        value={formData.password}
        errorMessage={errorMessage}
      />
      <Styled.RememberMe>
        <Styled.Checkbox
          name="rememberme"
          onChange={handleChange}
          checked={formData.rememberme}
        />
        {t('로그인 상태 유지')}
      </Styled.RememberMe>
      <Styled.Submit
        value={t('로그인')}
      />
      <Styled.Signup to="/signup" state={{ redirectTo }}>
        {t('회원가입')}
      </Styled.Signup>
      <Styled.ForgotPassword to="/forgot_password">
        {t('비밀번호를 잊으셨나요?')}
      </Styled.ForgotPassword>
    </Styled.Form>
  );
}

LoginForm.propTypes = {
  redirectTo: PropTypes.string,
};

LoginForm.defaultProps = {
  redirectTo: '/',
};

export default LoginForm;
