import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GlobalHeader from 'components/organisms/GlobalHeader';
import GlobalFooter from 'components/organisms/GlobalFooter';

const Main = styled.main.attrs({
  role: 'main',
})`
  display: flex;
  flex: 1;
  align-items: flex-start;
  background-color: var(--gray--light);
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-flow: column;
  max-width: 400px;
  margin: 48px auto;
  background-color: var(--white);
`;

// TODO: 그리드 기반으로 스타일 변경

const CompactTemplate = ({
  children,
}) => (
  <>
    <GlobalHeader />
    <Main>
      <Container>
        {children}
      </Container>
    </Main>
    <GlobalFooter />
  </>
);

CompactTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CompactTemplate;
