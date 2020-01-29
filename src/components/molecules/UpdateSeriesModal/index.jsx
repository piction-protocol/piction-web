import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import useAPI from 'hooks/useAPI';

import Modal from 'components/externals/Modal';
import { PrimaryButton, TertiaryButton } from 'components/atoms/Button';
import ErrorMessage from 'components/atoms/ErrorMessage';
import Input from 'components/atoms/Input';

const Styled = {
  Form: styled.form`
    display: flex;
    flex-flow: column;
  `,
  Title: styled.h2`
    margin-bottom: 24px;
    text-align: center;
  `,
  Submit: styled(PrimaryButton)`
    margin: 16px 0 8px;
  `,
  ErrorMessage: styled(ErrorMessage)`
    margin-top: 16px;
  `,
};

function UpdateSeriesModal({
  projectId, seriesId, value, close, callback, ...props
}) {
  const [API] = useAPI();
  const [name, setName] = useState(value);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (name.trim() === value) {
      close();
    } else {
      try {
        const response = await API.series(projectId).update({ seriesId, name: name.trim() });
        await callback((prev) => {
          const seriesList = [...prev];
          seriesList[prev.findIndex(series => series.id === response.data.id)] = response.data;
          return seriesList;
        });
        close();
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <Modal close={close} {...props}>
      <Styled.Form onSubmit={handleUpdate}>
        <Styled.Title>
          시리즈 수정
        </Styled.Title>
        <Input
          value={name}
          onChange={event => setName(event.target.value)}
          invalid={!!errorMessage}
          autoFocus
        />
        {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
        <Styled.Submit>
          확인
        </Styled.Submit>
        <TertiaryButton onClick={close}>
          취소
        </TertiaryButton>
      </Styled.Form>
    </Modal>
  );
}

UpdateSeriesModal.propTypes = {
  projectId: PropTypes.string.isRequired,
  seriesId: PropTypes.number,
  value: PropTypes.string,
  close: PropTypes.func.isRequired,
  callback: PropTypes.func,
};

export default UpdateSeriesModal;
