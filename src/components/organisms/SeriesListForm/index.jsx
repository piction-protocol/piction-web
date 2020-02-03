import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';

import useAPI from 'hooks/useAPI';

import CreateSeriesModal from 'components/molecules/CreateSeriesModal';
import UpdateSeriesModal from 'components/molecules/UpdateSeriesModal';
import DeleteSeriesModal from 'components/molecules/DeleteSeriesModal';
import SeriesItem from 'components/molecules/SeriesItem';
import Heading from 'components/atoms/Heading';
import { PrimaryButton } from 'components/atoms/Button';

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
  Create: styled(PrimaryButton).attrs({
    size: 'mini',
    type: 'button',
  })`
    position: absolute;
    top: 32px;
    right: 0;
  `,
  SeriesItem: styled(SeriesItem)`
    margin-bottom: 8px;
  `,
};

const getIdArray = array => array.map(item => item.id);

function SeriesListForm({ title, projectId }) {
  const [seriesList, setSeriesList] = useState([]);
  const [prevSeriesList, setPrevSeriesList] = useState([]);
  const [selected, setSelected] = useState({});
  const [modalStatus, setModalStatus] = useState(null);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getSeriesList = async () => {
      try {
        const { data } = await API.series(projectId).getAll();
        setSeriesList(data);
        setPrevSeriesList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSeriesList();

    return () => {
      setSeriesList([]);
      setSelected({});
      setModalStatus(null);
    };
  }, [API, projectId]);

  const modal = {
    create: (
      <CreateSeriesModal
        projectId={projectId}
        close={() => setModalStatus('')}
        callback={setSeriesList}
      />
    ),
    update: (
      <UpdateSeriesModal
        projectId={projectId}
        seriesId={selected.id}
        value={selected.name}
        close={() => setModalStatus('')}
        callback={setSeriesList}
      />
    ),
    delete: (
      <DeleteSeriesModal
        projectId={projectId}
        seriesId={selected.id}
        close={() => setModalStatus('')}
        callback={setSeriesList}
      />
    ),
  };

  const findSeries = (id) => {
    const series = seriesList.find(s => `${s.id}` === id);
    return {
      series,
      index: seriesList.indexOf(series),
    };
  };

  const moveSeries = (id, toIndex) => {
    const { series, index } = findSeries(id);
    setSeriesList(update(seriesList, {
      $splice: [[index, 1], [toIndex, 0, series]],
    }));
  };

  const [, drop] = useDrop({
    accept: 'series',
    drop: async () => {
      const seriesListIds = getIdArray(seriesList);
      if (JSON.stringify(seriesListIds) !== JSON.stringify(getIdArray(prevSeriesList))) {
        try {
          await API.series(projectId).sort({ ids: seriesListIds });
          setPrevSeriesList(seriesList);
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  return (
    <Styled.Form ref={drop}>
      <Styled.Heading>{title}</Styled.Heading>
      <Styled.Create onClick={() => setModalStatus('create')}>
        + 새 시리즈
      </Styled.Create>
      {seriesList.map(series => (
        <Styled.SeriesItem
          key={series.id}
          id={`${series.id}`}
          name={series.name}
          handleUpdate={() => {
            setModalStatus('update');
            setSelected(series);
          }}
          handleDelete={() => {
            setModalStatus('delete');
            setSelected(series);
          }}
          moveSeries={moveSeries}
          findSeries={findSeries}
        />
      ))}
      {modal[modalStatus]}
    </Styled.Form>
  );
}

SeriesListForm.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default SeriesListForm;
