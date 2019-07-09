import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as HeartIcon } from 'images/ic-heart.svg';

const Styled = {
  Button: styled.button`
    --color: ${({ isLike }) => (isLike ? 'var(--blue)' : 'var(--gray--dark)')};

    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 16px 24px 12px;
    border: 1px solid ${({ isLike }) => (isLike ? 'var(--blue)' : 'var(--gray--light)')};
    border-radius: 50%;
    background-color: var(--white);
    color: var(--color);
    box-shadow: 0 2px 4px 0 var(--shadow-color);
    cursor: pointer;
    pointer-events: ${({ isLike }) => (isLike ? 'none' : 'auto')};
    ${({ isLike }) => isLike && `
      svg path {
        stroke: currentColor;
        fill: currentColor;
      }
    `};
  `,
  HeartIcon: styled(HeartIcon)`
    width: 56px;
    height: 56px;
  `,
  Count: styled.p`
    font-size: var(--font-size--small);
  `,
};

function LikeButton({ likeCount, isLike, ...props }) {
  return (
    <Styled.Button isLike={isLike} {...props}>
      <Styled.HeartIcon />
      <Styled.Count>
        {likeCount}
      </Styled.Count>
    </Styled.Button>
  );
}

LikeButton.propTypes = {
  likeCount: PropTypes.number.isRequired,
  isLike: PropTypes.bool.isRequired,
};

export default LikeButton;
