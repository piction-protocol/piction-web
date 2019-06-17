import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Main = styled.main.attrs({
  role: 'main',
})`
  flex: 1;
`;

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--gap);
`;

function GridTemplate({ hero, children }) {
  return (
    <Main>
      {hero}
      <Container>
        {children}
      </Container>
    </Main>
  );
}

GridTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  hero: PropTypes.node,
};

GridTemplate.defaultProps = {
  hero: null,
};

export default GridTemplate;
