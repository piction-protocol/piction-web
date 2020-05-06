import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import media from 'styles/media';

import Cover from 'components/atoms/ContentImage/Cover';

const Styled = {
  Item: styled.article`
    display: flex;
    position: relative;
    flex-flow: column;
    background-color: var(--white);
  `,
  Covers: styled.div`
    display: flex;
    margin-bottom: 16px;
  `,
  Cover: styled(Cover)`
    flex: 1;
    &:first-child {
      z-index: 1;
      margin: 16px 16px 0 0;
      background-color: var(--white);
      ${media.desktop`
        margin: 24px 24px 0 0;
      `}
    }
    &:last-child {
      position: absolute;
      top: 0;
      right: 0;
      left: 16px;
      background-color: rgba(0, 0, 0, .1);
      filter: brightness(0.8);
      ${media.desktop`
        left: 24px;
      `}
    }
  `,
  Title: styled.h3`
    margin-bottom: 8px;
    font-size: var(--font-size--base);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  Text: styled.p`
    margin-bottom: 8px;
    color: var(--gray);
    font-size: var(--font-size--small);
  `,
};

function SeriesCard({
  name, thumbnails, postCount, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      <Styled.Covers>
        <Styled.Cover
          image={thumbnails[0]}
        />
        <Styled.Cover
          image={thumbnails[1]}
        />
      </Styled.Covers>
      <Styled.Title>{name}</Styled.Title>
      <Styled.Text>{`${postCount} 포스트`}</Styled.Text>
    </Styled.Item>
  );
}

SeriesCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnails: PropTypes.array,
  postCount: PropTypes.number,
};

export default SeriesCard;
