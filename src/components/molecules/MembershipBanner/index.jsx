import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';

import media from 'styles/media';

import { SecondaryButton } from 'components/atoms/Button';

import { ReactComponent as PictionSymbol } from 'images/piction-symbol.svg';

const Styled = {
  Aside: styled.aside`
    display: flex;
    justify-content: center;
    padding: 8px;
    border-bottom: 1px solid var(--gray--pale);
    background-color: var(--white);
  `,
  Container: styled.div`
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    flex: 1;
    max-width: var(--max-width);
    padding-right: var(--outer-gap);
    padding-left: var(--outer-gap);
  `,
  Symbol: styled(PictionSymbol)`
    width: 24px;
  `,
  Text: styled.span`
    flex: 1;
    margin: 0 12px;
    font-size: var(--font-size--small);
    word-break: keep-all;
    ${media.desktop`
      font-size: var(--font-size--big);
    `}
  `,
  Name: styled.span`
    color: var(--blue);
    font-weight: bold;
  `,
};

function MembershipBanner({ userName }) {
  const { t } = useTranslation();
  return (
    <Styled.Aside>
      <Styled.Container>
        <Styled.Symbol />
        <Styled.Text>
          <Styled.Name>{userName}</Styled.Name>
          {t('님은 여러분의 후원을 기다리고 있습니다.')}
        </Styled.Text>
        <SecondaryButton as={Link} to="memberships">
          {t('후원')}
        </SecondaryButton>
      </Styled.Container>
    </Styled.Aside>
  );
}

MembershipBanner.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default MembershipBanner;
