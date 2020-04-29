import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const Styled = {
  LengthCounter: styled.div`
    display: flex;
    grid-row: 2;
    grid-column: 9;
    align-items: center;
    color: var(--gray);
    font-size: var(--font-size--base);
    `,
};

function LengthCounter({ letterLength, maxLength }) {
  return (
    <Styled.LengthCounter>
      { `${letterLength.length} / ${maxLength}` }
    </Styled.LengthCounter>
  );
}

LengthCounter.propTypes = {
  letterLength: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
};

export default LengthCounter;
