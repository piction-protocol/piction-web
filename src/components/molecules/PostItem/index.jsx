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
    position: relative;
    flex-flow: ${props => (props.theme.viewType === 'LIST' ? 'row wrap' : 'column')};
    align-items: ${props => (props.theme.viewType === 'LIST' ? 'center' : 'stretch')};
    padding-bottom: 20px;
    border-bottom: 1px solid var(--gray--pale);
    background-color: var(--white);
  `,
  CoverWrapper: styled.div`
    position: relative;
    overflow: hidden;
    ${props => (props.theme.viewType === 'LIST' ? `
      width: 80px;
      height: 80px;
      margin-right: 24px;
    ` : `
      margin-bottom: 16px;
      padding-bottom: 100%;
    `)};
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
    overflow: hidden;
    ${props => (props.theme.viewType === 'LIST' ? `
      width: 80px;
      height: 80px;
      margin-right: 24px;
    ` : `
      margin-bottom: 16px;
    `)};
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
    ${props => (props.theme.viewType === 'LIST' ? `
      width: 32px;
      height: 32px;
    ` : `
      width: 80px;
      height: 80px;
    `)};
  `,
  LockedCover: styled(Cover)`
    filter: blur(24px);
  `,
  GrayLockedIcon: styled(LockedIcon)`
    align-self: flex-start;
    width: 20px;
    height: 20px;
    margin-top: ${({ hasSeries }) => (hasSeries ? '26px' : '4px')};
    color: #d9d9d9;
    ${media.mobile`
      margin-right: 12px;
      margin-left: 12px;
    `}
    ${media.desktop`
      margin-right: 8px;
    `}
  `,
  Text: styled.div`
    display: flex;
    flex-flow: column;
    flex: 1;
    overflow: hidden;
  `,
  Series: styled.p`
    margin-bottom: ${props => (props.theme.viewType === 'LIST' ? '2px' : '4px')};
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    ${placeholder}
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
      margin-bottom: ${props => (props.theme.viewType === 'LIST' ? '8px' : '12px')};
    `}
    ${props => (props.theme.viewType === 'LIST' ? 'white-space: nowrap;' : `
      p + & {
        white-space: nowrap;
      }
    `)}
    ${placeholder}
  `,
  PublishedAt: styled.p`
    margin-top: auto;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    ${placeholder}
  `,
  LikeCount: styled.span`
    display: flex;
    position: absolute;
    align-items: center;
    bottom: 20px;
    right: 0;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    ${media.desktop`
      right: 8px;
    `}
  `,
  ThumbupIcon: styled(ThumbupIcon)`
    margin-right: 4px;
  `,
};

function PostItem({
  title, cover = null, viewType, series, publishedAt, likeCount = 0, isLocked = false, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      {(viewType === 'CARD' || cover) ? (
        isLocked ? (
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
        )
      ) : (
        isLocked ? (
          <Styled.GrayLockedIcon
            hasSeries={!!series}
          />
        ) : null
      )}
      <Styled.Text>
        {series && <Styled.Series>{series.name}</Styled.Series>}
        <Styled.Title>{title}</Styled.Title>
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
    <Styled.Text>
      <Styled.Series isPlaceholder>Series</Styled.Series>
      <Styled.Title isPlaceholder>Title</Styled.Title>
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
  viewType: PropTypes.string,
  publishedAt: PropTypes.number.isRequired,
  likeCount: PropTypes.number,
  isLocked: PropTypes.bool,
};

export default PostItem;
