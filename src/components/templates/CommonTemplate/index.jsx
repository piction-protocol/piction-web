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
`;

const CommonTemplate = ({
  children,
}) => (
  <>
    <GlobalHeader />
    <Main>
      {children}
    </Main>
    <GlobalFooter />
  </>
);

CommonTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommonTemplate;
