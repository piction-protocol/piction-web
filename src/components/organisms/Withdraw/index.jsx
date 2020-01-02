import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import media from 'styles/media';
import Grid from 'styles/Grid';

import useAPI from 'hooks/useAPI';

import WithdrawModal from 'components/molecules/WithdrawModal';
import Input from 'components/atoms/Input';
import ErrorMessage from 'components/atoms/ErrorMessage';
import { PrimaryButton } from 'components/atoms/Button';

import Modal from 'components/externals/Modal';

import CoinOneLogo from 'images/img-logo-coin-one.png';
import BitberryLogo from 'images/img-logo-bitberry.png';
import NovaWalletLogo from 'images/img-logo-nova-wallet.png';

const Styled = {
  Form: styled(Grid).attrs({
    as: 'form',
    columns: 'var(--grid-columns)',
  })`
    grid-column: 1 / -1;
  `,
  Section: styled.section`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -1;
    margin-bottom: 24px;
    ${({ columns }) => media.desktop`
      grid-column: span ${columns};
    `}
  `,
  Title: styled.h2`
    margin-bottom: 8px;
    font-size: var(--font-size--small);
    font-weight: bold;
  `,
  Group: styled.div`
    display: flex;
    flex-flow: column;
    ${media.desktop`
      flex-flow: row;
    `}
  `,
  Balance: styled.p`
    margin-top: 8px;
    color: var(--blue);
    font-size: var(--font-size--small);
  `,
  Input: styled(Input)`
    width: 100%;
  `,
  ErrorMessage: styled(ErrorMessage)`
    margin-top: 8px;
  `,
  Link: styled.a`
    display: flex;
    margin-top: 16px;
    ${media.desktop`
      margin-right: 24px;
    `}
  `,
  List: styled.ul`
    padding-left: 16px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Item: styled.li`
    margin-bottom: 8px;
    color: #999999;
    list-style: square;
  `,
  Strong: styled.strong`
    color: var(--red);
    font-weight: normal;
  `,
  SubmitGroup: styled.div`
    grid-column: 1 / -1;
    padding-top: var(--row-gap);
    border-top: 1px solid var(--gray--light);
  `,
  Submit: styled(PrimaryButton).attrs({
    as: 'input',
    type: 'submit',
  })`
    ${media.mobile`
      width: 100%;
    `}
  `,
  Modal: styled(Modal)`
    text-align: center;
    ${PrimaryButton} {
      margin-top: 16px;
    }
  `,
};

function Withdraw({ wallet }) {
  const {
    register, errors, setError, getValues, handleSubmit,
  } = useForm();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [API] = useCallback(useAPI(), []);
  const onSubmit = async (data) => {
    if (data.password) {
      try {
        await API.my.withdraw(data);
        // FIXME : modal 전용 hook으로 관리
        setIsModalOpened(false);
        setIsSuccess(true);
      } catch ({ response: { data: error } }) {
        setError(error.field, error.status_code, error.message);
        if (error.field !== 'password') {
          setIsModalOpened(false);
        }
      }
    } else {
      setIsModalOpened(true);
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit(onSubmit)} id="withdraw">
      <Styled.Section columns={4}>
        <Styled.Title>출금 수량</Styled.Title>
        <Styled.Input
          type="number"
          name="amount"
          placeholder="0"
          invalid={errors.amount}
          ref={register({
            required: '출금 수량을 입력하세요.',
            min: {
              value: 1,
              message: '1 이상의 정수만 입력 가능합니다.',
            },
            max: {
              value: wallet.amount,
              message: 'PXL이 부족합니다.',
            },
          })}
        />
        {wallet.amountOriginal && (
          <Styled.Balance>
            {`출금 가능한 금액 : ${wallet.amountOriginal.replace(/(\d*?\.?\d*?)(\.?0+)( PXL)$/g, '$1$3')}`}
          </Styled.Balance>
        )}
        {errors.amount && (
          <Styled.ErrorMessage>
            {errors.amount.message}
          </Styled.ErrorMessage>
        )}
      </Styled.Section>
      <Styled.Section columns={4} style={{ gridRow: 2 }}>
        <Styled.Title>출금 주소</Styled.Title>
        <Styled.Input
          name="withdrawAddress"
          placeholder="출금 주소를 입력하세요."
          invalid={errors.withdrawAddress}
          ref={register({
            required: '출금 주소를 입력하세요.',
            pattern: {
              value: /^0x[a-fA-F0-9]{40}$/,
              message: '잘못된 주소입니다.',
            },
          })}
        />
        {errors.withdrawAddress && (
          <Styled.ErrorMessage>
            {errors.withdrawAddress.message}
          </Styled.ErrorMessage>
        )}
      </Styled.Section>
      <Styled.Section>
        <Styled.Title>출금을 지원하는 거래소 및 지갑 서비스</Styled.Title>
        <Styled.Group>
          <Styled.Link href="https://coinone.co.kr/exchange/trade/pxl/krw" target="_blank">
            <img src={CoinOneLogo} alt="coinone" />
          </Styled.Link>
          <Styled.Link href="https://bitberry.app/" target="_blank">
            <img src={BitberryLogo} alt="Bitberry Wallet" />
          </Styled.Link>
          <Styled.Link href="https://eosnova.io/" target="_blank">
            <img src={NovaWalletLogo} alt="NOVA Wallet" />
          </Styled.Link>
        </Styled.Group>
      </Styled.Section>
      <Styled.Section>
        <Styled.Title>주의사항</Styled.Title>
        <Styled.List>
          <Styled.Item>
            PXL 토큰은 Klaytn 블록체인 네트워크를 통해 전송되며, 전송이 시작되면 취소가 불가능합니다.
          </Styled.Item>
          <Styled.Item>
            입력한 출금 수량 및 출금 주소 오입력으로 인한 피해는 픽션이 책임지지 않습니다.
          </Styled.Item>
          <Styled.Item>
            Klaytn 네트워크를 지원하지 않는 거래소로의 송금은 불가능합니다.
          </Styled.Item>
          <Styled.Item>
            <Styled.Strong>
              다른 네트워크 또는 다른 토큰 입금 시 발생하는 오류 및 손실은 복구해 드리지 않습니다.
            </Styled.Strong>
          </Styled.Item>
        </Styled.List>
      </Styled.Section>
      <Styled.SubmitGroup>
        <Styled.Submit value="PXL 출금" />
      </Styled.SubmitGroup>
      {isModalOpened && (
        <WithdrawModal
          errors={errors}
          close={() => setIsModalOpened(false)}
          register={register}
          {...getValues()}
        />
      )}
      {isSuccess && (
        <Styled.Modal close={() => {}}>
          출금이 시작되었습니다.
          <br />
          네트워크 상황 및 거래소의 정책에 따라 시간이 좀 더 소요될 수 있습니다.
          <PrimaryButton onClick={() => window.location.reload()}>
            확인
          </PrimaryButton>
        </Styled.Modal>
      )}
    </Styled.Form>
  );
}

export default Withdraw;

Withdraw.propTypes = {
  wallet: PropTypes.object.isRequired,
};
