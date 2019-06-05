import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import Dropdown from 'components/atoms/Dropdown';

const Styled = {
  Wallet: styled.div`
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    padding: 16px;
    border-bottom: 1px solid var(--gray--light);
    color: var(--black);
    font-size: var(--font-size--small);
  `,
  PXL: styled.span`
    color: var(--blue);
  `,
  Links: styled.div`
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    padding: 16px;
  `,
  Link: styled(Link)`
    color: var(--black);
    font-size: var(--font-size--small);
    cursor: pointer;
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  `,
};

function UserMenu({
  links, PXL, className,
}) {
  return (
    <Dropdown className={className}>
      <Styled.Wallet>
        <Link to="/wallet">
          내 지갑
        </Link>
        <Styled.PXL>
          {`${PXL} PXL`}
        </Styled.PXL>
      </Styled.Wallet>
      <Styled.Links>
        {links.map(({
          text, ...link
        }) => (
          <Styled.Link key={text} {...link}>
            {text}
          </Styled.Link>
        ))}
      </Styled.Links>
    </Dropdown>
  );
}

export default UserMenu;

UserMenu.propTypes = {
  links: PropTypes.array.isRequired,
  PXL: PropTypes.number,
  className: PropTypes.string,
};

UserMenu.defaultProps = {
  PXL: 0,
  className: '',
};
