import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import useAPI from 'hooks/useAPI';

import InputGroup from 'components/molecules/InputGroup';
import Spinner from 'components/atoms/Spinner';
import { PrimaryButton } from 'components/atoms/Button';

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
    margin-bottom: 8px;
  `,
  Ul: styled.ul`
    margin-bottom: 16px;
    padding-left: 12px;
  `,
  Li: styled.li`
    margin-bottom: 8px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    list-style: disc;
  `,
  Link: styled(PrimaryButton).attrs({
    as: Link,
  })`
    display: block;
  `,
};

function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [API] = useAPI();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await API.resetPassword.sendEmail({ email });
      setIsSent(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      {isSent ? (
        <>
          <Styled.Text>
            비밀번호 재설정 메일을 전송했습니다.
            <br />
            메일함을 확인해주세요.
          </Styled.Text>
          <Styled.Ul>
            <Styled.Li>
              메일을 수신하지 못했다면, 스팸메일함을 확인해주세요.
            </Styled.Li>
            <Styled.Li>
              등록되지 않은 이메일인 경우 비밀번호 재설정 메일이 발송되지 않습니다.
            </Styled.Li>
          </Styled.Ul>
          <Styled.Link
            to="/"
          >
            홈으로 이동
          </Styled.Link>
        </>
      ) : (
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Text>
            회원 가입 때 등록하신 이메일 주소를 입력해주세요.
            <br />
            해당 이메일로 비밀번호를 재설정할 수 있는 링크를 보내드립니다.
          </Styled.Text>
          <Styled.InputGroup
            name="email"
            label="이메일"
            placeholder="example@email.com"
            autoComplete="email"
            onChange={event => setEmail(event.target.value)}
            required
            value={email}
            errorMessage={errorMessage}
          />
          <Styled.Submit
            value="확인"
          />
        </Styled.Form>
      )}
    </>
  );
}

export default ForgotPasswordForm;
