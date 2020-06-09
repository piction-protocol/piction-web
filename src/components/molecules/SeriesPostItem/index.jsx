import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import moment from 'moment';
import 'moment/locale/ko';
import { useTranslation } from 'react-i18next';

import media from 'styles/media';

import Cover from 'components/atoms/ContentImage/Cover';

const Styled = {
  Item: styled.article`
    display: flex;
    padding: var(--row-gap) 0;
    border-bottom: 1px solid var(--gray--pale);
    background-color: var(--white);
  `,
  Index: styled.div`
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 16px;
    color: var(--gray);
    font-size: 22px;
    font-weight: bold;
    ${media.desktop`
      order: 1;
      margin: auto 0 auto auto;
      font-size: var(--font-size--large);
    `}
  `,
  Cover: styled(Cover)`
    width: 111px;
    ${media.mobile`
      display: none;
    `}
  `,
  Text: styled.div`
    display: flex;
    flex: 1;
    flex-flow: column;
    overflow: hidden;
    ${media.desktop`
      margin: auto 40px;
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
  Membership: styled.p`
    color: var(--red);
    font-size: var(--font-size--small);
  `,
  PublishedAt: styled.p`
    color: var(--gray);
    font-size: var(--font-size--small);
  `,
};

function SeriesPostItem({
  index, title, cover = null, publishedAt, membership, isViewable, ...props
}) {
  const { t } = useTranslation();
  const browserLng = navigator.language;
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
            {
                browserLng === 'ko-KR' ? moment(publishedAt).format('MM/DD, YYYY, HH:mm [Reservation]') : moment(publishedAt).format('YYYY/MM/DD HH:mm 예약')
            }
            {/* {moment(publishedAt).format('YYYY년 MMMM Do hh:mm 발행')} */}
          </Styled.PublishedAt>
        ) : (
          <Styled.Membership>
            {membership.price > 0 ? `${membership.name} ${t('이상 후원자 전용')}` : `${t('구독자 전용')}`}
          </Styled.Membership>
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
  membership: PropTypes.object,
  isViewable: PropTypes.bool.isRequired,
};

const Placeholder = {
  Index: styled(Styled.Index)`
    color: var(--gray--pale);
    background-color: var(--gray--pale);
  `,
  Title: styled(Styled.Title)`
    color: var(--gray--pale);
    background-color: var(--gray--pale);
    width: 20%;
  `,
  PublishedAt: styled(Styled.PublishedAt)`
    color: var(--gray--pale);
    background-color: var(--gray--pale);
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
