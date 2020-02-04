import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import media from 'styles/media';

import { PrimaryButton } from 'components/atoms/Button';

import CoinOneLogo from 'images/img-logo-coin-one.png';
import BitberryLogo from 'images/img-logo-bitberry.png';
import NovaWalletLogo from 'images/img-logo-nova-wallet.png';

const Styled = {
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
  Key: styled.p`
    width: 100%;
    padding: 16px 0 14px;
    border-bottom: 2px solid;
    font-size: var(--font-size--small);
  `,
  Em: styled.em`
    color: var(--blue);
    font-style: normal;
  `,
  Copy: styled(PrimaryButton)`
    ${media.mobile`
      margin-top: 8px;
    `}
    ${media.desktop`
      flex: 1 0 auto;
      margin-left: 8px;
    `}
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
};

function Deposit({ wallet }) {
  const handleCopy = () => {
    const tempInput = document.createElement('input');
    const { body } = document;
    body.appendChild(tempInput);
    tempInput.setAttribute('value', wallet.publicKey);
    tempInput.select();
    document.execCommand('copy');
    alert('지갑 주소가 복사되었습니다.');
    body.removeChild(tempInput);
  };

  return (
    <>
      <Styled.Section columns={5}>
        <Styled.Title>내 지갑 주소</Styled.Title>
        <Styled.Group>
          {wallet.publicKey && (
            <Styled.Key>
              <Styled.Em>
                {wallet.publicKey.slice(0, 5)}
              </Styled.Em>
              {wallet.publicKey.slice(5, -5)}
              <Styled.Em>
                {wallet.publicKey.slice(-5)}
              </Styled.Em>
            </Styled.Key>
          )}
          <Styled.Copy onClick={handleCopy}>
            주소 복사
          </Styled.Copy>
        </Styled.Group>
      </Styled.Section>
      <Styled.Section>
        <Styled.Title>지원하는 입금 방법</Styled.Title>
        <Styled.List>
          <Styled.Item>
            Klaytn 네트워크 기반 PXL 출금이 가능한 거래소에서 이 지갑 주소로 송금합니다.
          </Styled.Item>
          <Styled.Item>
            Klaytn 네트워크를 지원하는 블록체인 지갑에 보유한 PXL을 이 지갑 주소로 송금합니다.
          </Styled.Item>
        </Styled.List>
      </Styled.Section>
      <Styled.Section>
        <Styled.Title>입금을 지원하는 거래소 및 지갑 서비스</Styled.Title>
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
            이더리움(ERC-20) 기반 네트워크의 PXL 토큰은 입금하실 수 없습니다.
          </Styled.Item>
          <Styled.Item>
            PXL 토큰 이외에 다른 토큰은 입금하실 수 없습니다.
          </Styled.Item>
          <Styled.Item>
            <Styled.Strong>
              다른 네트워크 또는 다른 토큰 입금 시 발생하는 오류 및 손실은 복구해 드리지 않습니다.
            </Styled.Strong>
          </Styled.Item>
        </Styled.List>
      </Styled.Section>
    </>
  );
}

export default Deposit;

Deposit.propTypes = {
  wallet: PropTypes.object.isRequired,
};
