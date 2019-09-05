import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ContentImage from 'components/atoms/ContentImage';

const Styled = {
  Item: styled.article`
    display: flex;
    position: relative;
    flex-flow: column;
    background-color: var(--white);
  `,
  Thumbnails: styled.div`
    display: flex;
    margin-bottom: 16px;
  `,
  Thumbnail: styled(ContentImage)`
    flex: 1;
    background-color: rgba(0, 0, 0, .1);
    &:first-child {
      z-index: 1;
      margin: 16px 16px 0 0;
    }
    &:last-child {
      position: absolute;
      top: 0;
      right: 0;
      left: 16px;
    }
  `,
  Title: styled.h3`
    margin-bottom: 8px;
    font-size: var(--font-size--small);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  Text: styled.p`
    margin-bottom: 16px;
    color: var(--gray--dark);
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
      <Styled.Thumbnails>
        <Styled.Thumbnail
          ratio={960 / 360}
          image={thumbnails[0]}
        />
        <Styled.Thumbnail
          ratio={960 / 360}
          image={thumbnails[1]}
        />
      </Styled.Thumbnails>
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
