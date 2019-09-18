import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';
import queryString from 'query-string';

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

  return (search ? isSent ? (
    <>
      <Styled.Text>
        비밀번호 재설정이 완료되었습니다.
        <br />
        다시 로그인해주세요.
      </Styled.Text>
      <Styled.Link
        to="/login"
      >
        로그인
      </Styled.Link>
    </>
  ) : (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Text>
        새로 설정할 비밀번호를 입력해주세요.
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
        label="새 비밀번호"
        placeholder="6자 이상의 비밀번호"
        type="password"
        autoComplete="new-password"
        required
        onChange={handleChange}
        value={formData.password}
        errorMessage={errorMessage.password}
      />
      <Styled.InputGroup
        name="passwordCheck"
        label="비밀번호 확인"
        placeholder="비밀번호 재입력"
        type="password"
        autoComplete="new-password"
        required
        onChange={handleChange}
        value={formData.passwordCheck}
        errorMessage={errorMessage.passwordCheck || errorMessage.null}
      />
      <Styled.Submit
        value="확인"
      />
    </Styled.Form>
  ) : null);
}

ResetPasswordForm.propTypes = {
  location: PropTypes.object,
};

export default ResetPasswordForm;
