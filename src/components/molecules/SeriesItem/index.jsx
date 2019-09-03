import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as EditIcon } from 'images/ic-edit.svg';
import { ReactComponent as DeleteIcon } from 'images/ic-delete.svg';

const Styled = {
  Item: styled.div`
    display: flex;
    align-items: center;
    border: 2px solid var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Name: styled.span`
    margin: 0 16px;
    font-weight: bold;
  `,
  Count: styled.span`
    color: var(--gray--dark);
  `,
  Buttons: styled.div`
    display: flex;
    margin-left: auto;
  `,
  Button: styled.button.attrs({
    type: 'button',
  })`
    display: flex;
    padding: 10px;
    border-left: 2px solid var(--gray--dark);
    cursor: pointer;
  `,
};

function SeriesItem({
  name, postCount, ...props
}) {
  return (
    <Styled.Item {...props}>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Count>{`${postCount} 포스트`}</Styled.Count>
      <Styled.Buttons>
        <Styled.Button>
          <EditIcon />
        </Styled.Button>
        <Styled.Button>
          <DeleteIcon />
        </Styled.Button>
      </Styled.Buttons>
    </Styled.Item>
  );
}

SeriesItem.propTypes = {
  name: PropTypes.string.isRequired,
  postCount: PropTypes.number.isRequired,
};

export default SeriesItem;
