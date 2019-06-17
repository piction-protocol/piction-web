import React from 'react';
import styled from 'styled-components';

import useCurrentUser from 'hooks/useCurrentUser';
import useWallet from 'hooks/useWallet';

import GridTemplate from 'components/templates/GridTemplate';
import UserInfo from 'components/organisms/UserInfo';
import Transactions from 'components/organisms/Transactions';
import Heading from 'components/atoms/Heading';

const Styled = {
  Heading: styled(Heading)`
    margin-bottom: 24px;
  `,
  PXL: styled.p`
    margin-bottom: 4px;
    font-size: var(--font-size--large);
    font-weight: bold;
  `,
  ELE: styled.p`
    color: var(--gray--dark);
    font-weight: bold;
    text-align: right;
  `,
};

function WalletPage() {
  const { currentUser } = useCurrentUser();
  const [wallet] = useWallet();

  return (
    <GridTemplate
      hero={(
        <UserInfo
          username={currentUser.username}
          picture={currentUser.picture}
          description={`계좌 주소 : ${wallet.publicKey}`}
        >
          <div>
            <Styled.PXL>
              {wallet.amount && `${wallet.amount.toLocaleString()} PXL`}
            </Styled.PXL>
            <Styled.ELE>
              123.4 ELE
            </Styled.ELE>
          </div>
        </UserInfo>
      )}
    >
      <Styled.Heading>
        거래 내역
      </Styled.Heading>
      <Transactions />
    </GridTemplate>
  );
}


export default WalletPage;
