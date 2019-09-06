import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import media from 'styles/media';
import Grid from 'styles/Grid';

import SeriesCard from 'components/molecules/SeriesCard';

import { ReactComponent as BadMoodIcon } from 'images/ic-mood-bad.svg';

const Styled = {
  Section: styled(Grid).attrs({
    columns: 'var(--grid-columns)',
    as: 'section',
  })`
    grid-column: 1 / -1;
  `,
  Link: styled(Link)`
    grid-column: span 6;
    ${media.desktop`
      h3 {
        font-size: var(--font-size--base);
      }
    `}
  `,
  Empty: styled.div`
    grid-column: 1 / -1;
    margin: 80px auto;
    color: var(--gray--dark);
    font-size: var(--font-size--base);
    text-align: center;
  `,
  BadMoodIcon: styled(BadMoodIcon)`
    width: 160px;
    height: 160px;
  `,
};

const Series = ({
  series,
}) => (
  <Styled.Section>
    {series.reduce((acc, item) => acc + item.postCount, 0) === 0 ? (
      <Styled.Empty>
        <Styled.BadMoodIcon />
        <p>
          등록된 시리즈가 없습니다.
        </p>
      </Styled.Empty>
    ) : series.map(item => item.postCount > 0 && (
      <Styled.Link
        to={`${item.id}`}
        key={item.id}
      >
        <SeriesCard {...item} />
      </Styled.Link>
    ))}
  </Styled.Section>
);

Series.propTypes = {
  series: PropTypes.array,
};

export default Series;
