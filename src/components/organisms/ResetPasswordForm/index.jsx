import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';

import useAPI from 'hooks/useAPI';
import useForm from 'hooks/useForm';

import { PrimaryButton } from 'components/atoms/Button';

import InputGroup from 'components/molecules/InputGroup';

const Styled = {
  Form: styled.form`
    display: flex;
    flex-flow: column;
    font-size: var(--font-size--small);
  `,
  Text: styled.p`
    margin-bottom: 24px;
    font-size: var(--font-size--small);
    line-height: var(--line-height--content);
  `,
  Email: styled.a`
    display: inline-block;
    margin-bottom: 24px;
    color: var(--blue);
    font-size: var(--font-size--small);
  `,
  InputGroup: styled(InputGroup)`
    margin-bottom: 24px;
  `,
  Submit: styled(PrimaryButton).attrs({
    as: 'input',
    type: 'submit',
  })`
    width: 100%;
  `,
  Link: styled(PrimaryButton).attrs({
    as: Link,
  })`
    display: block;
  `,
};

function ResetPasswordForm({ location: { search } }) {
  const { t } = useTranslation();
  const [isSent, setIsSent] = useState(false);
  const [formData, { handleChange }] = useForm({
    password: '',
    passwordCheck: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [API] = useAPI();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { token } = queryString.parse(search);
    try {
      await API.resetPassword.reset({ token, ...formData });
      setIsSent(true);
    } catch (error) {
      setErrorMessage({
        [error.response.data.field]: error.response.data.message,
      });
    }
  };

  return (!search ? (
    <>
      <Styled.Text>
        {t('잘못된 접근이거나, 유효기간이 만료된 링크로 접속하였습니다. 지속적으로 문제가 있을 경우 고객센터에 문의 바랍니다.')}
      </Styled.Text>
      <Styled.Email href="mailto:help@piction.network">
        help@piction.network
      </Styled.Email>
      <Styled.Link
        to="/"
      >
        {t('홈으로 이동')}
      </Styled.Link>
    </>
  ) : isSent ? (
    <>
      <Styled.Text>
        {t('비밀번호 재설정이 완료되었습니다.')}
        <br />
        {t('다시 로그인해주세요.')}
      </Styled.Text>
      <Styled.Link
        to="/login"
      >
        {t('로그인')}
      </Styled.Link>
    </>
  ) : (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Text>
        {t('새로 설정할 비밀번호를 입력해주세요.')}
      </Styled.Text>
      <input
        type="text"
        name="email"
        autoComplete="email"
        style={{
          display: 'none',
        }}
      />
      <Styled.InputGroup
        name="password"
        label={t('새 비밀번호')}
        placeholder={t('6자 이상의 비밀번호')}
        type="password"
        autoComplete="new-password"
        required
        onChange={handleChange}
        value={formData.password}
        errorMessage={errorMessage.password}
      />
      <Styled.InputGroup
        name="passwordCheck"
        label={t('비밀번호 확인')}
        placeholder={t('비밀번호 재입력')}
        type="password"
        autoComplete="new-password"
        required
        onChange={handleChange}
        value={formData.passwordCheck}
        errorMessage={errorMessage.passwordCheck || errorMessage.null}
      />
      <Styled.Submit
        value={t('확인')}
      />
    </Styled.Form>
  ));
}

ResetPasswordForm.propTypes = {
  location: PropTypes.object,
};

export default ResetPasswordForm;
