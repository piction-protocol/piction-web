import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components/macro';
import useSWR from 'swr';
import axios from 'axios';

import useCurrentUser from 'hooks/useCurrentUser';

import media from 'styles/media';

import { withLoginChecker } from 'components/LoginChecker';

import GridTemplate from 'components/templates/GridTemplate';
import UserInfo from 'components/organisms/UserInfo';
import Tabs from 'components/molecules/Tabs';
import Heading from 'components/atoms/Heading';

const Transactions = React.lazy(() => import('components/organisms/Transactions'));
const Deposit = React.lazy(() => import('components/organisms/Deposit'));
const Withdraw = React.lazy(() => import('components/organisms/Withdraw'));

const Styled = {
  Heading: styled(Heading)`
    grid-column: 1 / -1;
    margin-top: var(--row-gap);
    ${media.mobile`
      display: none;
    `}
  `,
  Tabs: styled(Tabs)`
    grid-column: 1 / -1;
    ${media.mobile`
      margin: 0 calc(var(--outer-gap) * -1);
    `}
  `,
  PXL: styled.span`
    color: #999999;
    font-weight: bold;
    font-size: 16px;
    ${media.desktop`
      font-size: 20px;
    `}
  `,
  Won: styled.span`
    margin-left: 4px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    font-weight: bold;
    ${media.desktop`
      font-size: 16px;
    `}
  `,
};

function WalletPage() {
  const { currentUser } = useCurrentUser();
  const { data: wallet = { amount: 0 } } = useSWR('/my/wallet', { revalidateOnFocus: false });
  const { data: rate = 4000 } = useSWR('https://api.coinone.co.kr/ticker?currency=PXL', async (path) => {
    const response = await axios.get(path);
    return response.data.last;
  }, { revalidateOnFocus: false });

  const { path } = useRouteMatch()

  return (
    <GridTemplate
      hero={(
        <UserInfo
          {...currentUser}
        >
          <Styled.PXL>
            {`${wallet.amount.toLocaleString()} PXL`}
          </Styled.PXL>
          {wallet.amount > 0 && (
            <Styled.Won>
              {`≒ ${Math.floor(wallet.amount * rate).toLocaleString()}원`}
            </Styled.Won>
          )}
        </UserInfo>
      )}
    >
      <Styled.Heading>
        내 지갑
      </Styled.Heading>
      <Styled.Tabs
        links={[
          { text: '거래 내역', to: 'transactions' },
          { text: '입금', to: 'deposit' },
          { text: '출금', to: 'withdraw' },
        ]}
      />
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/transactions`} />
        </Route>
        <Route path={`${path}/transactions`} component={Transactions} />
        <Route path={`${path}/deposit`}>
          <Deposit wallet={wallet} />
        </Route>
        <Route path={`${path}/withdraw`}>
          <Withdraw wallet={wallet} />
        </Route>
      </Switch>
    </GridTemplate>
  );
}

export default withLoginChecker(WalletPage);
