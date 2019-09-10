import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useAPI from 'hooks/useAPI';

import CreateSeriesModal from 'components/molecules/CreateSeriesModal';
import UpdateSeriesModal from 'components/molecules/UpdateSeriesModal';
import DeleteSeriesModal from 'components/molecules/DeleteSeriesModal';
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
  Create: styled(PrimaryButton).attrs({
    size: 'mini',
    type: 'button',
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
    border: 2px solid var(--gray--dark);
    border-right: 0px;
    cursor: move;
  `,
};

function SeriesListForm({ title, projectId }) {
  const [seriesList, setSeriesList] = useState([]);
  const [selected, setSelected] = useState({});
  const [modalStatus, setModalStatus] = useState(null);
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

  return (
    <Styled.Form>
      <Styled.Heading>{title}</Styled.Heading>
      <Styled.Create onClick={() => setModalStatus('create')}>
        + 새 시리즈
      </Styled.Create>
      {seriesList.map(series => (
        <Styled.Series key={series.id}>
          <Styled.Indicator />
          <Styled.SeriesItem
            name={series.name}
            handleUpdate={() => {
              setModalStatus('update');
              setSelected(series);
            }}
            handleDelete={() => {
              setModalStatus('delete');
              setSelected(series);
            }}
          />
        </Styled.Series>
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
