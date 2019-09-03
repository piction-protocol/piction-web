import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useAPI from 'hooks/useAPI';

import SeriesItem from 'components/molecules/SeriesItem';
import Heading from 'components/atoms/Heading';
import { PrimaryButton } from 'components/atoms/Button';

import { ReactComponent as DragIndicatorIcon } from 'images/ic-drag-indicator.svg';

const Styled = {
  Heading: styled(Heading)`
    margin-bottom: 24px;
  `,
  Form: styled.form`
    display: flex;
    flex: 1;
    flex-flow: column;
    position: relative;
    padding: 24px 0;
    font-size: var(--font-size--small);
  `,
  Add: styled(PrimaryButton).attrs({
    size: 'mini',
  })`
    position: absolute;
    top: 32px;
    right: 0;
  `,
  Series: styled.div`
    display: flex;
    margin-bottom: 8px;
  `,
  SeriesItem: styled(SeriesItem)`
    flex: 1;
  `,
  Indicator: styled(DragIndicatorIcon)`
    width: 48px;
    height: 48px;
    padding: 12px;
  `,
};

function SeriesListForm({ title, projectId }) {
  const [seriesList, setSeriesList] = useState([]);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getSeriesList = async () => {
      try {
        const { data } = await API.series(projectId).getAll();
        setSeriesList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSeriesList();
  }, [API, projectId]);

  return (
    <Styled.Form>
      <Styled.Heading>{title}</Styled.Heading>
      <Styled.Add>
        + 새 시리즈
      </Styled.Add>
      {seriesList.map(series => (
        <Styled.Series key={series.id}>
          <Styled.SeriesItem name={series.name} postCount={series.postCount} />
          <Styled.Indicator />
        </Styled.Series>
      ))}
    </Styled.Form>
  );
}

SeriesListForm.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default SeriesListForm;
