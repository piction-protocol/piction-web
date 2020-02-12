import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import moment from 'moment';
import 'moment/locale/ko';

import media from 'styles/media';
import placeholder from 'styles/placeholder';

import { ReactComponent as ThumbupIcon } from 'images/ic-thumbup.svg';
import { ReactComponent as LockedIcon } from 'images/ic-locked.svg';

import Cover from 'components/atoms/ContentImage/Cover';

const Styled = {
  Item: styled.article`
    display: flex;
    flex-flow: column;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--gray--light);
    background-color: var(--white);
  `,
  CoverWrapper: styled.div`
    position: relative;
    margin-bottom: 16px;
    padding-bottom: 100%;
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
  `,
  LockedIcon: styled(LockedIcon)`
    width: 80px;
    height: 80px;
  `,
  LockedCover: styled(Cover)`
    filter: blur(24px);
  `,
  Series: styled.p`
    margin-bottom: 4px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Title: styled.h2`
    max-height: 3em;
    margin-bottom: 8px;
    padding-right: 8px;
    overflow: hidden;
    font-size: var(--font-size--base);
    line-height: 1.5;
    text-overflow: ellipsis;
    ${media.desktop`
      margin-bottom: 10px;
    `}
    p + & {
      white-space: nowrap;
    }
    ${placeholder}
  `,
  Text: styled.div`
    display: flex;
    align-items: center;
    margin-top: auto;
    height: 24px;
  `,
  PublishedAt: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    ${placeholder}
  `,
  LikeCount: styled.span`
    display: flex;
    align-items: center;
    margin-left: auto;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    ${media.desktop`
      margin-right: 8px;
    `}
  `,
  ThumbupIcon: styled(ThumbupIcon)`
    margin-right: 4px;
  `,
};

function PostItem({
  title, cover = null, series, publishedAt, likeCount = 0, isLocked = false, fanPass, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      {isLocked ? (
        <Styled.Locked>
          <Styled.LockedText>
            <Styled.LockedIcon />
          </Styled.LockedText>
          <Styled.LockedCover
            image={cover}
          />
        </Styled.Locked>
      ) : (
        <Styled.CoverWrapper>
          <Styled.Cover
            image={cover}
          />
        </Styled.CoverWrapper>
      )}
      {series && <Styled.Series>{series.name}</Styled.Series>}
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

PostItem.Placeholder = () => (
  <Styled.Item>
    <Styled.CoverWrapper>
      <Styled.Cover
        image={null}
      />
    </Styled.CoverWrapper>
    <Styled.Title isPlaceholder>Title</Styled.Title>
    <Styled.Text>
      <Styled.PublishedAt isPlaceholder>
        Published at
      </Styled.PublishedAt>
    </Styled.Text>
  </Styled.Item>
);

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  series: PropTypes.object,
  fanPass: PropTypes.object,
  publishedAt: PropTypes.number.isRequired,
  likeCount: PropTypes.number,
  isLocked: PropTypes.bool,
};

export default PostItem;
