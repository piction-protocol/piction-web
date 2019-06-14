import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

const Styled = {
  Tabs: styled.div`
    display: flex;
    flex-flow: row wrap;
    border-top: 1px solid var(--black);
  `,
  Tab: styled(Link)`
    position: relative;
    padding: 24px 0;
    color: var(--gray--dark);
    :not(:last-child) {
      margin-right: 48px;
    }
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

function Tabs({
  links, className,
}) {
  return (
    <Styled.Tabs className={className}>
      {links.map(({
        text, ...link
      }) => (
        <Styled.Tab
          getProps={({ isCurrent }) => (isCurrent ? { 'aria-current': 'active' } : null)}
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
  className: PropTypes.string,
  links: PropTypes.array.isRequired,
};

Tabs.defaultProps = {
  className: '',
};
