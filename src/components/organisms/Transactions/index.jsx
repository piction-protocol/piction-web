import React, { useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import moment from 'moment';
import 'moment/locale/ko';

import media from 'styles/media';
import Grid from 'styles/Grid';

import Pagination from 'components/molecules/Pagination';

const Styled = {
  Table: styled.div`
    --row-height: 52px;
    display: flex;
    grid-column: 1 / -1;
    flex-flow: column;
    font-size: var(--font-size--small);
  `,
  Thead: styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    height: var(--row-height);
    border: solid var(--black);
    border-width: 1px 0;
    background-color: var(--gray--light);
    font-weight: bold;
    ${media.mobile`
      display: none;
    `}
  `,
  Row: styled(Grid).attrs({
    column: 'var(--grid-columns)',
  })`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    height: var(--row-height);
    border-bottom: 1px solid var(--gray--dark);
  `,
  Cell: styled.div`
    flex: 1;
    text-align: center;
  `,
  Pagination: styled(Pagination)`
    grid-column: 1 / -1;
    margin: var(--row-gap) auto;
  `,
};

const transactionTypeText = (inOut, transactionType) => (
  inOut === 'IN' ? ({
    SPONSORSHIP: '후원금 수령',
    SUBSCRIPTION: 'FAN PASS 판매',
  }[transactionType] || '입금') : ({
    SPONSORSHIP: '후원',
    SUBSCRIPTION: 'FAN PASS 구매',
  }[transactionType] || '출금')
);

function Transactions() {
  const [page, setPage] = useState(1);
  const FETCHING_SIZE = 10;

  const {
    data: { content: transactions, ...pageable } = {},
  } = useSWR(`/my/transactions?page=${page}&size=${FETCHING_SIZE}`, {
    revalidateOnFocus: false,
  });

  return (
    <>
      <Styled.Table>
        <Styled.Thead>
          <Styled.Cell>거래 시간</Styled.Cell>
          <Styled.Cell>거래 금액</Styled.Cell>
          <Styled.Cell>종류 / 내역</Styled.Cell>
          <Styled.Cell>상태</Styled.Cell>
        </Styled.Thead>
        {transactions ? transactions.map(({
          inOut,
          amountOriginal,
          blockTime,
          transactionType,
          transactionHash,
        }) => (
          <Styled.Row key={transactionHash}>
            <Styled.Cell>{moment(blockTime).format('YYYY/MM/DD HH:mm:ss')}</Styled.Cell>
            <Styled.Cell>
              {`${(inOut === 'IN' ? '+' : '-') + amountOriginal.replace(/(\d*?\.?\d*?)(\.?0+)( PXL)$/g, '$1$3')}`}
            </Styled.Cell>
            <Styled.Cell>{transactionTypeText(inOut, transactionType)}</Styled.Cell>
            <Styled.Cell>완료</Styled.Cell>
          </Styled.Row>
        )) : (
          [...new Array(FETCHING_SIZE)].map(() => (
            <Styled.Row>
              <Styled.Cell></Styled.Cell>
              <Styled.Cell></Styled.Cell>
              <Styled.Cell></Styled.Cell>
              <Styled.Cell></Styled.Cell>
            </Styled.Row>
          ))
        )}
      </Styled.Table>
      <Styled.Pagination
        number={pageable.number}
        totalPages={pageable.totalPages}
        setPage={setPage}
        delta={5}
      />
    </>
  );
}

export default Transactions;
