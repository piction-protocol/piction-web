import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import useCurrentUser from 'hooks/useCurrentUser';

const Styled = {
  Table: styled.div`
    --row-height: 52px;

    display: flex;
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
  `,
  Row: styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    height: var(--row-height);
    border-bottom: 1px solid var(--gray--dark);
    ${({ isSuccess }) => isSuccess || 'color: var(--red);'}
  `,
  Cell: styled.div`
    flex: 1;
    text-align: center;
  `,
};

function Transactions() {
  const [content, setContent] = useState([]);
  const { accessToken } = useCurrentUser();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://api-iro.piction.network/my-transactions', {
          headers: {
            'X-Auth-Token': accessToken,
          },
          params: {
            page: 1,
            size: 50,
          },
        });
        setContent(data.content);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [accessToken]);

  return (
    <Styled.Table>
      <Styled.Thead>
        <Styled.Cell>종류</Styled.Cell>
        <Styled.Cell>상태</Styled.Cell>
        <Styled.Cell>거래 금액</Styled.Cell>
        <Styled.Cell>완료 시간(*실패 시간)</Styled.Cell>
      </Styled.Thead>
      {content.map(({
        inOut,
        status,
        amount,
        createdAt,
      }) => (
        <Styled.Row isSuccess={status === 'SUCCESS'} key={createdAt}>
          <Styled.Cell>{inOut === 'IN' ? '입금' : '출금'}</Styled.Cell>
          <Styled.Cell>{status === 'SUCCESS' ? '성공' : '실패'}</Styled.Cell>
          <Styled.Cell>{`${(inOut === 'IN' ? '+' : '-') + amount.toLocaleString()} PXL`}</Styled.Cell>
          <Styled.Cell>{createdAt.replace(/[T]/g, ' ')}</Styled.Cell>
        </Styled.Row>
      ))}
    </Styled.Table>
  );
}

Transactions.propTypes = {
};

Transactions.defaultProps = {
};

export default Transactions;
