import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import media from 'styles/media';

import { ReactComponent as ThumbupIcon } from 'images/ic-thumbup.svg';

import ContentImage from 'components/atoms/ContentImage';

const Styled = {
  Item: styled.article`
    display: flex;
    flex-flow: column;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--gray--light);
    background-color: var(--white);
  `,
  Cover: styled(ContentImage)`
    margin-bottom: 16px;
  `,
  Title: styled.h2`
    margin-bottom: 4px;
    font-size: var(--font-size--small);
    ${media.desktop`
      font-size: var(--font-size--base);
    `}
  `,
  Text: styled.div`
    display: flex;
    align-items: flex-end;
  `,
  CreatedAt: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  LikeCount: styled.span`
    display: flex;
    align-items: center;
    margin-left: auto;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    ${media.desktop`
      margin-right: 24px;
    `}
  `,
  ThumbupIcon: styled(ThumbupIcon)`
    margin-right: 4px;
  `,
};

function dateConverter(time) {
  const parsedTimeString = time.replace(
    /([+-])([0-9]{2})([0-9]{2})\b/,
    (params, p1, p2, p3) => `${p1}${p2}:${p3}`,
  );
  const date = new Date(parsedTimeString);

  return `${(date.getMonth() + 1)}월 ${date.getDate()}일`;
}

function PostItem({
  title, cover, createdAt, likeCount, ...props
}) {
  const createdDate = dateConverter(createdAt);
  return (
    <Styled.Item
      {...props}
    >
      {cover && (
        <Styled.Cover
          ratio={960 / 360}
          image={cover}
        />
      )}
      <Styled.Title>{title}</Styled.Title>
      <Styled.Text>
        <Styled.CreatedAt>
          {createdDate}
        </Styled.CreatedAt>
        {likeCount > 0 && (
          <Styled.LikeCount>
            <Styled.ThumbupIcon />
            {likeCount}
          </Styled.LikeCount>
        )}
      </Styled.Text>
    </Styled.Item>
  );
}

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  likeCount: PropTypes.number,
};

PostItem.defaultProps = {
  cover: null,
  likeCount: 0,
};

export default PostItem;
