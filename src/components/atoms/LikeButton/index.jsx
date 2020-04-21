import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { ReactComponent as HeartIcon } from 'images/ic-heart.svg';

const Styled = {
  Button: styled.button`
    --color: ${({ isLiked }) => (isLiked ? 'var(--blue)' : 'var(--gray--dark)')};

    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 16px 24px 12px;
    border: 1px solid ${({ isLiked }) => (isLiked ? 'var(--blue)' : 'var(--gray--pale)')};
    border-radius: 50%;
    color: var(--color);
    box-shadow: 0 2px 4px 0 var(--shadow-color);
    cursor: pointer;
    pointer-events: ${({ isLiked }) => (isLiked ? 'none' : 'auto')};
    ${({ isLiked }) => isLiked && `
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

function LikeButton({ likeCount, isLiked, ...props }) {
  return (
    <Styled.Button isLiked={isLiked} {...props}>
      <Styled.HeartIcon />
      <Styled.Count>
        {likeCount}
      </Styled.Count>
    </Styled.Button>
  );
}

LikeButton.propTypes = {
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
};

export default LikeButton;
