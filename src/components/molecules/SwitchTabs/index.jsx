import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';

import media from 'styles/media';

const Styled = {
  Tabs: styled.div`
    display: flex;
    flex-flow: row wrap;
  `,
  Tab: styled(Link)`
    position: relative;
    flex: 1;
    border: 1px solid;
    padding: 10px;
    color: var(--gray);
    text-align: center;
    ${media.desktop`
      flex: 0 auto;
      padding: 10px 24px;
    `}
    &[aria-current] {
      background-color: var(--blue);
      border-color: var(--blue);
      color: var(--white);
      font-weight: bold;
    }
  `,
};

function SwitchTabs({ links = [], ...props }) {
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

export default SwitchTabs;

SwitchTabs.propTypes = {
  links: PropTypes.array,
};
