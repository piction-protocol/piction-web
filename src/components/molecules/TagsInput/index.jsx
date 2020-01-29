import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import ReactTagsInput from 'react-tagsinput';

import CancelIcon from 'images/ic-cancel-black.svg';

const Styled = {
  TagsInput: styled(ReactTagsInput)`
    display: flex;
    padding: 6px;
    border: 2px solid var(--gray--dark);
    background-color: var(--white);
    font-size: var(--font-size--small);
    line-height: normal;
    transition: box-shadow var(--transition--form), border-color var(--transition--form);
    cursor: text;

    &.react-tagsinput--focused {
      border-color: var(--black);
      outline: none;
      box-shadow: 2px 4px 4px 0 var(--shadow-color);
    }

    .react-tagsinput-tag {
      display: flex;
      margin-right: 8px;
      padding: 8px 12px;
      border-radius: 8px;
      background-color: var(--gray--light);
      color: var(--black);
      &::before {
        content: '#';
      }
    }

    .react-tagsinput-remove {
      width: 20px;
      height: 20px;
      margin-left: 4px;
      background-image: url(${CancelIcon});
      background-size: cover;
      cursor: pointer;
    }

    .react-tagsinput-input {
      border: none;
      outline: none;
      padding: 10px 0;
      &::placeholder {
        color: var(--gray--dark);
      }
      &:only-child {
        padding-left: 8px;
      }
    }

    ${({ invalid }) => invalid && 'border-color: var(--red)'};
  `,

  Layout: styled.div`
    display: flex;
  `,
};

const renderLayout = (tag, input) => (
  <>
    {tag}
    {input}
  </>
);

function TagsInput({ placeholder = '', ...props }) {
  return (
    <Styled.TagsInput
      {...props}
      addKeys={[9, 13, 32]}
      renderLayout={renderLayout}
      inputProps={{
        placeholder,
      }}
    />
  );
}

TagsInput.propTypes = {
  placeholder: PropTypes.string,
};

export default TagsInput;
