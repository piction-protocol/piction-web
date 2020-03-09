import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link, navigate } from '@reach/router';
import queryString from 'query-string';
import useSWR from 'swr';

import useAPI from 'hooks/useAPI';

import GridTemplate from 'components/templates/GridTemplate';
import { PrimaryButton } from 'components/atoms/Button';

import { ReactComponent as OptOutIcon } from 'images/img-optout.svg';

const Styled = {
  Container: styled.section`
    grid-column: 1 / -1;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 56px;
  `,
  OptOutIcon: styled(OptOutIcon)`
    width: 120px;
  `,
  Text: styled.p`
    margin: 24px 0;
    color: #bababa;
    text-align: center;
    word-break: keep-all;
  `,
  Bold: styled.strong`
    color: var(--black);
    font-weight: bold;
  `,
  Link: styled(Link)`
    color: var(--blue);
    text-decoration: underline;
  `,
};

function OptOut({ location: { search } }) {
  const { token } = queryString.parse(search);
  const { error: newsletterError } = useSWR(() => `/users/newsletter/token/${token}`, {
    revalidateOnFocus: false,
    errorOnRetry: false,
  });
  const [API] = useAPI();

  if (newsletterError) {
    navigate('/404');
  }

  const unsubscribe = async () => {
    try {
      await API.newsletter.deleteByToken({ token });
      // FIXME: 토스트 메시지로 변경
      alert('업데이트 알림 메일을 발송하지 않습니다.');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GridTemplate>
      <Styled.Container>
        <Styled.OptOutIcon />
        <Styled.Text>
          업데이트 알림 메일 수신을 원하지 않으신
          경우 아래
          {' '}
          <Styled.Bold>수신 거부 </Styled.Bold>
          버튼을 눌러주세요.
          <br />
          <Styled.Link to="/subscriptions">
            구독 중인 프로젝트
          </Styled.Link>
          {' '}
          메뉴에서 언제든지
          재설정하실 수 있습니다.
        </Styled.Text>
        <PrimaryButton onClick={unsubscribe}>
          수신 거부
        </PrimaryButton>
      </Styled.Container>
    </GridTemplate>
  );
}

OptOut.propTypes = {
  location: PropTypes.object.isRequired,
};

export default OptOut;
