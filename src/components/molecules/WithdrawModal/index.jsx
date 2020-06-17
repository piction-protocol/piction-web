import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useTranslation, Trans } from 'react-i18next';


import Modal from 'components/externals/Modal';
import { PrimaryButton, TertiaryButton } from 'components/atoms/Button';
import Checkbox from 'components/atoms/Checkbox';
import PasswordInput from 'components/atoms/Input/PasswordInput';
import ErrorMessage from 'components/atoms/ErrorMessage';

const Styled = {
  Text: styled.p`
    margin-bottom: 24px;
    text-align: center;
  `,
  Amount: styled.strong`
    font-weight: bold;
  `,
  Address: styled.p`
    margin-bottom: 16px;
    padding: 8px;
    background-color: var(--gray--pale);
    font-size: var(--font-size--small);
    text-align: center;
    word-break: break-all;
  `,
  Em: styled.em`
    color: var(--blue);
    font-style: normal;
  `,
  Label: styled.label`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    margin-bottom: 16px;
    font-size: var(--font-size--small);
  `,
  Checkbox: styled(Checkbox)`
    flex: 0 0 auto;
    margin-right: 8px;
  `,
  Submit: styled(PrimaryButton).attrs(() => ({
    as: 'input',
    type: 'submit',
  }))`
    margin: 16px 0 8px;
  `,
  ErrorMessage: styled(ErrorMessage)`
    margin-top: 8px;
  `,
};

function WithdrawModal({
  amount, withdrawAddress, close, errors, register, ...props
}) {
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState(false);
  const sendPXL = Number(amount).toLocaleString();

  return (
    <Modal close={close} {...props}>
      <Styled.Text>
        <Trans i18nKey="픽셀 전송">
          다음 주소로
          {' '}
          <Styled.Amount>
            {{ sendPXL }}
            {' '}
            PXL
          </Styled.Amount>
          을 전송합니다.
        </Trans>
      </Styled.Text>
      <Styled.Address>
        <Styled.Em>
          {withdrawAddress.slice(0, 5)}
        </Styled.Em>
        {withdrawAddress.slice(5, -5)}
        <Styled.Em>
          {withdrawAddress.slice(-5)}
        </Styled.Em>
      </Styled.Address>
      <Styled.Label>
        <Styled.Checkbox
          checked={isChecked}
          onChange={() => setIsChecked(prev => !prev)}
        />
        {t('출금 주의사항을 모두 확인하였습니다.')}
      </Styled.Label>
      <PasswordInput
        name="password"
        ref={register({
          required: `${t('비밀번호를 입력하세요.')}`,
        })}
        placeholder={t('비밀번호를 입력하세요.')}
        invalid={errors.password}
      />
      {errors.password && (
        <Styled.ErrorMessage>
          {errors.password.message}
        </Styled.ErrorMessage>
      )}
      <Styled.Submit value={t('출금')} form="withdraw" disabled={!isChecked} />
      <TertiaryButton onClick={close}>
        {t('취소')}
      </TertiaryButton>
    </Modal>
  );
}

WithdrawModal.propTypes = {
  amount: PropTypes.string.isRequired,
  withdrawAddress: PropTypes.string.isRequired,
  errors: PropTypes.object,
  register: PropTypes.func,
  close: PropTypes.func.isRequired,
};

export default WithdrawModal;
