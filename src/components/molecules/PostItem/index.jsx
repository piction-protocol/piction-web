import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

import media from 'styles/media';

import { ReactComponent as ThumbupIcon } from 'images/ic-thumbup.svg';
import { ReactComponent as LockedIcon } from 'images/ic-locked.svg';

import Cover from 'components/atoms/ContentImage/Cover';

const Styled = {
  Item: styled.article`
    display: flex;
    flex-flow: column;
    padding-bottom: var(--row-gap);
    border-bottom: 1px solid var(--gray--light);
    background-color: var(--white);
  `,
  CoverWrapper: styled.div`
    position: relative;
    margin-bottom: 16px;
    padding-bottom: 37.5%;
    overflow: hidden;
  `,
  Cover: styled(Cover)`
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform var(--transition--form);
    article:hover & {
      transform: scale(1.1);
    }
  `,
  Locked: styled.div`
    position: relative;
    margin-bottom: 16px;
    overflow: hidden;
  `,
  LockedText: styled.p`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .3);
    color: var(--white);
    font-size: var(--font-size--small);
    text-align: center;
    white-space: pre-line;
    ${media.desktop`
      font-size: var(--font-size--base);
      line-height: var(--line-height--content);
    `}
  `,
  LockedIcon: styled(LockedIcon)`
    margin-bottom: 8px;
    ${media.desktop`
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    `}
  `,
  LockedCover: styled(Cover)`
    filter: blur(16px);
    ${media.desktop`
      filter: blur(24px);
    `}
  `,
  Series: styled.p`
    margin-bottom: 8px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
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
  PublishedAt: styled.p`
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

function PostItem({
  title, cover = null, series, publishedAt, likeCount = 0, isLocked = false, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      {isLocked ? (
        <Styled.Locked>
          <Styled.LockedText>
            <Styled.LockedIcon />
            구독자 전용 포스트입니다.
          </Styled.LockedText>
          <Styled.LockedCover
            ratio={960 / 360}
            image={cover}
          />
        </Styled.Locked>
      ) : (
        cover && (
          <Styled.CoverWrapper>
            <Styled.Cover
              ratio={960 / 360}
              image={cover}
            />
          </Styled.CoverWrapper>
        )
      )}
      {series && (
        <Styled.Series>{`시리즈 · ${series.name}`}</Styled.Series>
      )}
      <Styled.Title>{title}</Styled.Title>
      <Styled.Text>
        <Styled.PublishedAt>
          {moment(publishedAt).format('MMMM Do')}
        </Styled.PublishedAt>
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
  series: PropTypes.object,
  publishedAt: PropTypes.number.isRequired,
  likeCount: PropTypes.number,
  isLocked: PropTypes.bool,
};

export default PostItem;
