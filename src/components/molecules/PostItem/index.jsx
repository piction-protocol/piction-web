import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

import media from 'styles/media';

import { ReactComponent as ThumbupIcon } from 'images/ic-thumbup.svg';
import { ReactComponent as LockedIcon } from 'images/ic-locked.svg';

import ContentImage from 'components/atoms/ContentImage';

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
  Cover: styled(ContentImage)`
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
  LockedCover: styled(ContentImage)`
    filter: blur(16px);
    ${media.desktop`
      filter: blur(24px);
    `}
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

function PostItem({
  title, cover, createdAt, likeCount, isLocked, subscriptionPrice, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      {isLocked ? (
        <Styled.Locked>
          <Styled.LockedText>
            <Styled.LockedIcon />
            {`${subscriptionPrice}PXL로 멤버십 한정 콘텐츠를\n자유롭게 열람하세요.`}
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
      <Styled.Title>{title}</Styled.Title>
      <Styled.Text>
        <Styled.CreatedAt>
          {moment(createdAt).format('MMMM Do')}
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
  createdAt: PropTypes.number.isRequired,
  likeCount: PropTypes.number,
  isLocked: PropTypes.bool,
  subscriptionPrice: PropTypes.number,
};

PostItem.defaultProps = {
  cover: null,
  likeCount: 0,
  isLocked: false,
  subscriptionPrice: 0,
};

export default PostItem;
