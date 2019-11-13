import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

import media from 'styles/media';
import Grid from 'styles/Grid';

import Cover from 'components/atoms/ContentImage/Cover';

const Styled = {
  Item: styled(Grid).attrs({
    as: 'article',
    columns: '8',
  })`
    padding: var(--row-gap) 0;
    border-bottom: 1px solid var(--gray--light);
    background-color: var(--white);
    ${media.mobile`
      display: flex;
    `}
  `,
  Index: styled.div`
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 16px;
    color: var(--gray--dark);
    font-size: 22px;
    font-weight: bold;
    ${media.desktop`
      grid-column: -2;
      grid-row: 1;
      margin: auto;
      font-size: var(--font-size--large);
    `}
  `,
  Cover: styled(Cover)`
      grid-column: span 3;
    ${media.mobile`
      display: none;
    `}
  `,
  Text: styled.div`
    display: flex;
    flex-flow: column;
    overflow: hidden;
    ${media.desktop`
      grid-column: span 4;
      justify-content: center;
    `}
  `,
  Title: styled.h2`
    margin-bottom: 4px;
    overflow: hidden;
    font-size: var(--font-size--small);
    font-weight: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${media.desktop`
      font-size: var(--font-size--base);
    `}
  `,
  FanPass: styled.p`
    color: var(--red);
    font-size: var(--font-size--small);
  `,
  PublishedAt: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
};

function SeriesPostItem({
  index, title, cover = null, publishedAt, fanPass, isViewable, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      <Styled.Index>
        #
        {index}
      </Styled.Index>
      <Styled.Cover image={cover} />
      <Styled.Text>
        <Styled.Title>{title}</Styled.Title>
        {isViewable ? (
          <Styled.PublishedAt>
            {moment(publishedAt).format('YYYY년 MMMM Do hh:mm 발행')}
          </Styled.PublishedAt>
        ) : (
          <Styled.FanPass>
            {fanPass.subscriptionPrice > 0 && `${fanPass.name} 이상 `}
            구독자 전용
          </Styled.FanPass>
        )}
      </Styled.Text>
    </Styled.Item>
  );
}

SeriesPostItem.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  publishedAt: PropTypes.number.isRequired,
  fanPass: PropTypes.object,
  isViewable: PropTypes.bool.isRequired,
};

const Placeholder = {
  Index: styled(Styled.Index)`
    color: var(--gray--light);
    background-color: var(--gray--light);
  `,
  Title: styled(Styled.Title)`
    color: var(--gray--light);
    background-color: var(--gray--light);
    width: 20%;
  `,
  PublishedAt: styled(Styled.PublishedAt)`
    color: var(--gray--light);
    background-color: var(--gray--light);
    width: 40%;
  `,
};

SeriesPostItem.Placeholder = () => (
  <Styled.Item>
    <Placeholder.Index>
      ##
    </Placeholder.Index>
    <Styled.Cover />
    <Styled.Text>
      <Placeholder.Title>Title</Placeholder.Title>
      <Placeholder.PublishedAt>Published at</Placeholder.PublishedAt>
    </Styled.Text>
  </Styled.Item>
);

export default SeriesPostItem;
