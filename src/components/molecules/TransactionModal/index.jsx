import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useSWR from 'swr';

import Modal from 'components/externals/Modal';

import { ReactComponent as CloseIcon } from 'images/ic-close.svg';

const Styled = {
  Modal: styled(Modal)`
    position: relative;
    padding: 0;
    max-height: 66.6%;
    overflow-y: auto;
    text-align: left;
  `,
  Close: styled.button`
    display: flex;
    position: absolute;
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
    }
  `,
  Title: styled.h2`
    padding: 24px;
  `,
  Section: styled.section`
    display: flex;
    flex-flow: column;
    word-break: break-all;
  `,
  SectionTitle: styled.h3`
    padding: 8px 24px;
    background-color: #f1f9ff;
    font-size: var(--font-size--small);
    font-weight: bold;
  `,
  Item: styled.div`
    padding: 12px 24px;
    border-bottom: 1px solid var(--gray--light);
  `,
  Name: styled.p`
    margin-bottom: 2px;
    font-size: 16px;
  `,
  Value: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    a {
      color: var(--blue);
      text-decoration: underline;
    }
  `,
};

function TransactionModal({
  transaction: {
    inOut, transactionType, transactionHash,
    fromAddress, toAddress, amountOriginal, blockNumber, txHashWithUrl,
  }, close, ...props
}) {
  const { data: detail = {} } = useSWR(`/my/transactions/${transactionType.toLowerCase()}/${transactionHash}`, {
    revalidateOnFocus: false,
  });

  return (
    <Styled.Modal close={close} {...props}>
      <Styled.Title>
        {inOut === 'IN' ? '입금 상세 정보' : '출금 상세 정보'}
      </Styled.Title>
      <Styled.Close onClick={close}>
        <CloseIcon />
      </Styled.Close>
      {transactionType === 'SUBSCRIPTION' && (
        <Styled.Section>
          <Styled.SectionTitle>
            FAN PASS 판매 정보
          </Styled.SectionTitle>
          <Styled.Item>
            <Styled.Name>주문 번호</Styled.Name>
            <Styled.Value>{detail.orderNo}</Styled.Value>
          </Styled.Item>
          <Styled.Item>
            <Styled.Name>프로젝트</Styled.Name>
            <Styled.Value>{detail.projectName}</Styled.Value>
          </Styled.Item>
          <Styled.Item>
            <Styled.Name>FAN PASS</Styled.Name>
            <Styled.Value>{detail.fanPassName}</Styled.Value>
          </Styled.Item>
          <Styled.Item>
            <Styled.Name>구매자</Styled.Name>
            <Styled.Value>{detail.subscriber && detail.subscriber.loginId}</Styled.Value>
          </Styled.Item>
        </Styled.Section>
      )}
      {transactionType === 'SPONSORSHIP' && (
        <Styled.Section>
          <Styled.SectionTitle>
            후원 정보
          </Styled.SectionTitle>
          <Styled.Item>
            <Styled.Name>후원자</Styled.Name>
            <Styled.Value>{detail.sponsor && detail.sponsor.loginId}</Styled.Value>
          </Styled.Item>
          <Styled.Item>
            <Styled.Name>후원 대상</Styled.Name>
            <Styled.Value>{detail.creator && detail.creator.loginId}</Styled.Value>
          </Styled.Item>
        </Styled.Section>
      )}
      <Styled.Section>
        <Styled.SectionTitle>
          트랜잭션 정보
        </Styled.SectionTitle>
        <Styled.Item>
          <Styled.Name>From</Styled.Name>
          <Styled.Value>{fromAddress}</Styled.Value>
        </Styled.Item>
        <Styled.Item>
          <Styled.Name>To</Styled.Name>
          <Styled.Value>{toAddress}</Styled.Value>
        </Styled.Item>
        <Styled.Item>
          <Styled.Name>Amount</Styled.Name>
          <Styled.Value>{`${amountOriginal.replace(/(\d*?\.?\d*?)(\.?0+)( PXL)$/g, '$1$3')}`}</Styled.Value>
        </Styled.Item>
        <Styled.Item>
          <Styled.Name>Block #</Styled.Name>
          <Styled.Value>{blockNumber}</Styled.Value>
        </Styled.Item>
        <Styled.Item>
          <Styled.Name>TX HASH</Styled.Name>
          <Styled.Value>
            <a href={txHashWithUrl}>
              {transactionHash}
            </a>
          </Styled.Value>
        </Styled.Item>
      </Styled.Section>
    </Styled.Modal>
  );
}

TransactionModal.propTypes = {
  transaction: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

export default TransactionModal;
