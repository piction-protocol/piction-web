import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';

import media from 'styles/media';
import Grid from 'styles/Grid';

import SeriesCard from 'components/molecules/SeriesCard';

import { ReactComponent as BadMoodIcon } from 'images/ic-mood-bad.svg';

const Styled = {
  Section: styled(Grid).attrs({
    as: 'section',
  })`
    grid-column: 1 / -1;
  `,
  Link: styled(Link)`
    grid-column: 1 / -1;
    ${media.desktop`
      grid-column: span 3;
    `}
  `,
  Empty: styled.div`
    grid-column: 1 / -1;
    margin: 80px auto;
    color: var(--gray);
    font-size: var(--font-size--base);
    text-align: center;
  `,
  BadMoodIcon: styled(BadMoodIcon)`
    width: 160px;
    height: 160px;
  `,
};

const SeriesList = ({ series }) => {
  const { t } = useTranslation();
  return (
    <Styled.Section>
      {series.reduce((acc, item) => acc + item.postCount, 0) === 0 ? (
        <Styled.Empty>
          <Styled.BadMoodIcon />
          <p>
            {t('등록된 시리즈가 없습니다.')}
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
};

SeriesList.propTypes = {
  series: PropTypes.array,
};

export default SeriesList;
