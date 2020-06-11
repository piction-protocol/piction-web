import React, { useState } from 'react';
import styled from 'styled-components/macro';
import useSWR from 'swr';
import moment from 'moment';
import 'moment/locale/ko';
import { useTranslation } from 'react-i18next';
import i18n from 'language/i18n';

import media from 'styles/media';
import Grid from 'styles/Grid';

import Pagination from 'components/molecules/Pagination';
import TransactionModal from 'components/molecules/TransactionModal';

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
    background-color: var(--gray--pale);
    font-weight: bold;
    ${media.mobile`
      display: none;
    `}
  `,
  Row: styled(Grid)`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    height: var(--row-height);
    border-bottom: 1px solid var(--gray);
    cursor: pointer;
    &:hover {
      background-color: #f1f9ff;
    }
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
    SPONSORSHIP: `${('후원 수익')}`,
  }[transactionType] || `${('입금')}`) : ({
    SPONSORSHIP: `${('후원 플랜')}`,
  }[transactionType] || `${('출금')}`)
);

function Transactions() {
  const { t } = useTranslation();
  const PageLanguage = i18n.language;
  const [page, setPage] = useState(1);
  const FETCHING_SIZE = 10;

  const {
    data: { content: transactions, ...pageable } = {},
  } = useSWR(`/my/wallet/transactions?page=${page}&size=${FETCHING_SIZE}`, {
    revalidateOnFocus: false,
  });

  const [selected, setSelected] = useState(null);

  return (
    <>
      <Styled.Table>
        <Styled.Thead>
          <Styled.Cell>{t('거래 시간')}</Styled.Cell>
          <Styled.Cell>{t('거래 금액')}</Styled.Cell>
          <Styled.Cell>{t('종류 / 내역')}</Styled.Cell>
          <Styled.Cell>{t('상태')}</Styled.Cell>
        </Styled.Thead>
        {transactions ? transactions.map(transaction => (
          <Styled.Row key={transaction.transactionHash} onClick={() => setSelected(transaction)}>
            <Styled.Cell>{PageLanguage === 'kr' ? moment(transaction.blockTime).format('YYYY/MM/DD HH:mm:ss') : moment(transaction.blockTime).format('MM/DD YYYY HH:mm:ss')}</Styled.Cell>
            <Styled.Cell>
              {`${(transaction.inOut === 'IN' ? '+' : '-') + transaction.amountOriginal.replace(/(\d*?\.?\d*?)(\.?0+)( PXL)$/g, '$1$3')}`}
            </Styled.Cell>
            <Styled.Cell>{transactionTypeText(transaction.inOut, transaction.transactionType)}</Styled.Cell>
            <Styled.Cell>{t('완료')}</Styled.Cell>
          </Styled.Row>
        )) : (
          [...new Array(FETCHING_SIZE)].map(() => (
            <Styled.Row>
              <Styled.Cell />
              <Styled.Cell />
              <Styled.Cell />
              <Styled.Cell />
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
      {selected && (
        <TransactionModal
          transaction={selected}
          close={() => setSelected(null)}
        />
      )}
    </>
  );
}

export default Transactions;
