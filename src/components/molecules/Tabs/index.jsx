import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import media from 'styles/media';

const Styled = {
  Tabs: styled.div`
    display: flex;
    flex-flow: row wrap;
    border-top: 1px solid var(--black);
  `,
  Tab: styled(Link)`
    position: relative;
    flex: 1;
    padding: 16px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    text-align: center;
    ${media.desktop`
      flex: 0 auto;
      padding: 24px 0;
      font-size: var(--font-size--base);
      :not(:last-child) {
        margin-right: 48px;
      }
    `}
    &[aria-current] {
      color: var(--black);
      font-weight: bold;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        border-top: 5px solid;
      };
    }
  `,
};

function Tabs({ links = [], ...props }) {
  return (
    <Styled.Tabs {...props}>
      {links.map(({
        text, ...link
      }) => (
        <Styled.Tab
          key={text}
          {...link}
        >
          {text}
        </Styled.Tab>
      ))}
    </Styled.Tabs>
  );
}

export default Tabs;

Tabs.propTypes = {
  links: PropTypes.array,
};
