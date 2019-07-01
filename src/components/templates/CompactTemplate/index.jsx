import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import media from 'styles/media';
import { MainGrid } from 'styles/Grid';

const Styled = {
  Main: styled.main.attrs({
    role: 'main',
  })`
    display: flex;
    flex: 1;
    align-items: flex-start;
    ${media.desktop`
      background-color: var(--gray--light);
    `}
  `,

  Container: styled.div`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -1;
    background-color: var(--white);
    margin: 24px 0;
    ${media.desktop`
      grid-column: 5 / 9;
      margin: 48px 0;
      padding: 24px;
    `}
  `,
};

const CompactTemplate = ({
  children,
}) => (
  <Styled.Main>
    <MainGrid>
      <Styled.Container>
        {children}
      </Styled.Container>
    </MainGrid>
  </Styled.Main>
);

CompactTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CompactTemplate;
