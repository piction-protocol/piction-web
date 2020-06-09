import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import useSWR, { mutate } from 'swr';
import { useTranslation } from 'react-i18next';

import useAPI from 'hooks/useAPI';

import { PrimaryButton, SecondaryButton, TertiaryButton } from 'components/atoms/Button';
import Modal from 'components/externals/Modal';
import Alert from 'components/externals/Alert';

import { ReactComponent as PostboxIcon } from 'images/ic-postbox.svg';

const Styled = {
  Button: styled.button`
    display: flex;
    align-items: center;
  `,
  PostboxIcon: styled(PostboxIcon)`
    margin-right: 12px;
  `,
  Modal: styled(Modal)`
    text-align: center;
    word-break: keep-all;
  `,
  Email: styled.p`
    margin: 24px 0 16px;
    padding: 16px;
    background-color: var(--gray--pale);
  `,
};

function NewsletterManager({ currentUser, ...props }) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { data: newsletter } = useSWR('/users/newsletter');
  const [API] = useAPI();
  const [alert, setAlert] = useState(null);
  const { t } = useTranslation();

  const subscribe = async () => {
    try {
      const { data } = await API.newsletter.create();
      mutate('/users/newsletter', data);
      setIsModalOpened(false);
      setAlert({ text: `${t('업데이트 알림 메일을 발송합니다.')}`, type: 'success' });
    } catch (error) {
      console.log(error);
      setAlert({ text: `${t('서버가 응답하지 않습니다.')}`, type: 'error' });
    }
  };

  const unsubscribe = async () => {
    try {
      await API.newsletter.delete();
      mutate('/users/newsletter', null);
      setAlert({ text: `${t('업데이트 알림 메일을 발송하지 않습니다.')}` });
    } catch (error) {
      console.log(error);
      setAlert({ text: `${t('서버가 응답하지 않습니다.')}`, type: 'error' });
    }
  };

  return (
    <>
      {newsletter ? (
        <Styled.Button
          as={SecondaryButton}
          onClick={unsubscribe}
          {...props}
        >
          <Styled.PostboxIcon />
          {t('업데이트 알림 끄기')}
        </Styled.Button>
      ) : (
        <Styled.Button
          as={PrimaryButton}
          onClick={() => setIsModalOpened(true)}
          {...props}
        >
          <Styled.PostboxIcon />
          {t('업데이트 알림 받기')}
        </Styled.Button>
      )}
      {isModalOpened && (
        <Styled.Modal close={() => setIsModalOpened(false)}>
          {t('회원 정보에 등록된 이메일로 구독 중인 프로젝트의 업데이트 알림 메시지를 받습니다.')}
          <Styled.Email>
            {currentUser.email}
          </Styled.Email>
          <PrimaryButton onClick={subscribe}>
            {t('확인')}
          </PrimaryButton>
          <TertiaryButton onClick={() => setIsModalOpened(false)}>
            {t('취소')}
          </TertiaryButton>
        </Styled.Modal>
      )}
      {alert && (
        <Alert type={alert.type}>
          {alert.text}
        </Alert>
      )}
    </>
  );
}

NewsletterManager.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default NewsletterManager;
