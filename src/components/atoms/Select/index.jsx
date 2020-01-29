import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import ExpandIcon from 'images/ic-expand-more.svg';

const Styled = {
  Select: styled.select`
    appearance: none;
    padding: 6px 10px;
    border: 2px solid var(--gray--dark);
    border-radius: 0;
    background-color: var(--white);
    background-image: url(${ExpandIcon});
    background-position: right 4px center;
    background-size: 24px;
    background-repeat: no-repeat;
    font-size: var(--font-size--small);
    color: var(--gray--dark);
    line-height: normal;
    &:disabled {
      background-color: var(--gray--light);
    }
  `,
};

function Select({ options, ...props }) {
  return (
    <Styled.Select {...props}>
      {options.map(({
        text, ...attrs
      }) => (
        <option {...attrs} key={text}>
          {text}
        </option>
      ))}
    </Styled.Select>
  );
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
};

export default Select;
